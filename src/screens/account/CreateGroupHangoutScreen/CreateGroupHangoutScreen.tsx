import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Input } from '@components/general/Input/Input';
import COLORS from '@constants/COLORS';
import { CreateGroupHangoutScreenStyle } from '@screens/account/CreateGroupHangoutScreen/CreateGroupHangoutScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { HangoutPicker } from '@components/general/HangoutPicker/HangoutPicker';
import { PersonAccountScreenStyle } from '@screens/account/PersonAccountScreen/PersonAccountScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HangoutCreateInterface } from '@interfaces/post/Post.inteface';
import { HangoutPickerEnum } from '@components/general/HangoutPicker/HangoutPicker.enum';

export const CreateGroupHangoutScreen = (): JSX.Element => {
    const { username, profilePicture } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const user = 'A';

    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();
    const [isHangoutSent, setIsHangoutSent] = useState<boolean>(false);

    const sendHangout = useCallback(() => {
        postRequest<ResponseInterface, HangoutCreateInterface>(
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/create/hangout',
            {
                user,
                username,
                time: dateTime,
                place
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setIsHangoutSent(true);
            }
        });
    }, [dateTime, user, username, place]);

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
                placeholder="What is happening?"
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
                onPress={sendHangout}
                style={PersonAccountScreenStyle.hangoutTouchableOpacity}
            >
                <Text style={PersonAccountScreenStyle.hangoutText}>
                    {sendButtonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
