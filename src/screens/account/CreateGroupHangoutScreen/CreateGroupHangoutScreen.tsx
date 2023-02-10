import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, Keyboard, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import FastImage from 'react-native-fast-image';
import { Input } from '@components/general/Input/Input';
import COLORS from '@constants/COLORS';
import { CreateGroupHangoutScreenStyle } from '@screens/account/CreateGroupHangoutScreen/CreateGroupHangoutScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { HangoutPicker } from '@components/general/HangoutPicker/HangoutPicker';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseUploadImageInterface
} from '@interfaces/response/Response.interface';
import {
    GroupHangoutCreateInterface,
    UploadImageInterface
} from '@interfaces/post/Post.inteface';
import { HangoutPickerEnum } from '@components/general/HangoutPicker/HangoutPicker.enum';
import { resetChoosePeopleState } from '@store/ChoosePeopleReducer';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';

export const CreateGroupHangoutScreen = (): JSX.Element => {
    const { firstname, username } = useSelector(
        (state: ReducerProps) => state.user.user
    );
    const { users } = useSelector((state: ReducerProps) => state.choosePeople);
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>();
    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();
    const [isPlaceFocused, setIsPlaceFocused] = useState<boolean>(false);
    const [picture, setPicture] = useState<string>();

    const photoUrl = useRef<string>();

    const [isHangoutSent, setIsHangoutSent] = useState<boolean>(false);

    useEffect(() => {
        dispatch(resetChoosePeopleState());
    }, [dispatch]);

    const choosePhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            setPicture(image?.sourceURL);

            postRequest<ResponseUploadImageInterface, UploadImageInterface>(
                'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/upload/photo',
                {
                    key: `hangout-images/${username}/${image.filename}`,
                    buffer: base64,
                    isHangout: true
                }
            ).subscribe((response: ResponseUploadImageInterface) => {
                if (!response?.status) {
                    Alert.alert("Sorry, we couldn't upload this image 😔");
                } else {
                    photoUrl.current = response?.imageUrl;
                }
            });
        });
    }, [username]);

    const sendGroupHangout = useCallback(() => {
        postRequest<ResponseInterface, GroupHangoutCreateInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/hangout/group',
            {
                user: username,
                name: firstname,
                title,
                usernames: users,
                time: dateTime,
                place,
                picture: photoUrl?.current
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setIsHangoutSent(true);
                dispatch(resetChoosePeopleState());
            }
        });
    }, [dateTime, dispatch, firstname, place, title, username, users]);

    const buttonText = useMemo((): string => {
        if (isHangoutSent) {
            return 'Sent ✅';
        }
        return 'Send';
    }, [isHangoutSent]);

    return (
        <ScrollView
            onScrollBeginDrag={Keyboard.dismiss}
            style={CreateGroupHangoutScreenStyle.container}
        >
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                enabled={isPlaceFocused}
            >
                <Input
                    value={title}
                    onFocus={() => setIsPlaceFocused(false)}
                    placeholder="What is happening?"
                    onChangeText={setTitle}
                    selectionColor={COLORS.WHITE}
                    style={CreateGroupHangoutScreenStyle.input}
                    viewStyle={CreateGroupHangoutScreenStyle.inputView}
                />
                <TouchableOpacity
                    onPress={choosePhoto}
                    style={CreateGroupHangoutScreenStyle.imageTouchableOpacity}
                >
                    <FastImage
                        source={{ uri: picture }}
                        style={CreateGroupHangoutScreenStyle.image}
                    />
                </TouchableOpacity>
                <HangoutPicker
                    isVisible
                    onDateTimeChange={setDateTime}
                    onPlaceChange={setPlace}
                    onPlaceInputFocusChanged={(focused) =>
                        setIsPlaceFocused(focused)
                    }
                    type={HangoutPickerEnum.GROUP}
                />
                <TouchableOpacity
                    onPress={sendGroupHangout}
                    style={
                        CreateGroupHangoutScreenStyle.hangoutTouchableOpacity
                    }
                >
                    <Text style={CreateGroupHangoutScreenStyle.hangoutText}>
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
