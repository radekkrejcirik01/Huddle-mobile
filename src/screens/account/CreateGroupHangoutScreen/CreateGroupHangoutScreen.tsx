import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, Keyboard, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
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
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { GroupHangoutCreateInterface } from '@interfaces/post/Post.inteface';
import { HangoutPickerEnum } from '@components/general/HangoutPicker/HangoutPicker.enum';
import {
    resetChoosePeopleState,
    setUsersAction
} from '@store/ChoosePeopleReducer';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';

export const CreateGroupHangoutScreen = (): JSX.Element => {
    const { firstname, username } = useSelector(
        (state: ReducerProps) => state.user.user
    );
    const { users } = useSelector((state: ReducerProps) => state.choosePeople);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [title, setTitle] = useState<string>();
    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();
    const [isPlaceFocused, setIsPlaceFocused] = useState<boolean>(false);
    const [picture, setPicture] = useState<string>();

    const photoRef = useRef<{ buffer: string; fileName: string }>({
        buffer: null,
        fileName: null
    });

    const [isHangoutSent, setIsHangoutSent] = useState<boolean>(false);

    useEffect(
        () =>
            navigation.addListener('beforeRemove', () => {
                setTimeout(() => {
                    dispatch(setUsersAction([]));
                }, 1000);
            }),
        [dispatch, navigation]
    );

    const choosePhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            photoRef.current.buffer = await fs.readFile(image?.path, 'base64');
            photoRef.current.fileName = image.filename;

            setPicture(image?.sourceURL);
        });
    }, []);

    const sendGroupHangout = useCallback(() => {
        if (users?.length) {
            postRequest<ResponseInterface, GroupHangoutCreateInterface>(
                'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/hangout/group',
                {
                    user: username,
                    name: firstname,
                    title,
                    usernames: users,
                    time: dateTime,
                    place,
                    buffer: photoRef?.current?.buffer,
                    fileName: photoRef?.current?.fileName
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    setIsHangoutSent(true);
                    dispatch(resetChoosePeopleState());
                }
            });
        } else {
            Alert.alert('Please add someone to create group hangout');
        }
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
