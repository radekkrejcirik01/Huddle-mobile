import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { PersonAccountScreenStyle } from '@screens/account/PersonAccountScreen/PersonAccountScreen.style';
import { PersonAccountScreenProps } from '@screens/account/PersonAccountScreen/PersonAccountScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HangoutCreateInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { HangoutPicker } from '@components/general/HangoutPicker/HangoutPicker';

export const PersonAccountScreen = ({
    route
}: PersonAccountScreenProps): JSX.Element => {
    const { firstname, username, profilePicture } = route.params;

    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const navigation = useNavigation();

    const [isHangoutSent, setIsHangoutSent] = useState<boolean>(false);

    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();

    useEffect(() => {
        navigation.setOptions({ title: username });
    }, [navigation, username]);

    const sendButtonText = useMemo((): string => {
        if (isHangoutSent) {
            return 'Hangout sent ✅';
        }
        return 'Send';
    }, [isHangoutSent]);

    const sendHangout = useCallback(() => {
        postRequest<ResponseInterface, HangoutCreateInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/hangout',
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

    return (
        <View style={PersonAccountScreenStyle.container}>
            <FastImage
                source={{ uri: profilePicture }}
                style={PersonAccountScreenStyle.image}
            />
            <Text style={PersonAccountScreenStyle.name}>{firstname}</Text>
            <HangoutPicker
                onDateTimeChange={setDateTime}
                onPlaceChange={setPlace}
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
