import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import { resetChoosePeopleState } from '@store/ChoosePeopleReducer';

export const CreateGroupHangoutScreen = (): JSX.Element => {
    const { username, profilePicture } = useSelector(
        (state: ReducerProps) => state.user.user
    );
    const { users } = useSelector((state: ReducerProps) => state.choosePeople);
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>();
    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();
    const [picture, setPicture] = useState<string>();

    const [isHangoutSent, setIsHangoutSent] = useState<boolean>(false);

    const sendGroupHangout = useCallback(() => {
        postRequest<ResponseInterface, GroupHangoutCreateInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/hangout/group',
            {
                user: username,
                title,
                usernames: users,
                time: dateTime,
                place,
                picture
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setIsHangoutSent(true);
                dispatch(resetChoosePeopleState());
            }
        });
    }, [dateTime, dispatch, picture, place, title, username, users]);

    const sendButtonText = useMemo((): string => {
        if (isHangoutSent) {
            return 'Hangout sent ✅';
        }
        return 'Send';
    }, [isHangoutSent]);

    return (
        <View style={CreateGroupHangoutScreenStyle.container}>
            <Input
                autoFocus
                value={title}
                placeholder="What is happening?"
                onChangeText={setTitle}
                selectionColor={COLORS.WHITE}
                style={CreateGroupHangoutScreenStyle.input}
                viewStyle={CreateGroupHangoutScreenStyle.inputView}
            />
            <TouchableOpacity
                style={CreateGroupHangoutScreenStyle.imageTouchableOpacity}
            >
                <FastImage
                    source={{ uri: profilePicture }}
                    style={CreateGroupHangoutScreenStyle.image}
                />
            </TouchableOpacity>
            <HangoutPicker
                onDateTimeChange={setDateTime}
                onPlaceChange={setPlace}
                type={HangoutPickerEnum.GROUP}
            />
            <TouchableOpacity
                onPress={sendGroupHangout}
                style={CreateGroupHangoutScreenStyle.hangoutTouchableOpacity}
            >
                <Text style={CreateGroupHangoutScreenStyle.hangoutText}>
                    {sendButtonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
