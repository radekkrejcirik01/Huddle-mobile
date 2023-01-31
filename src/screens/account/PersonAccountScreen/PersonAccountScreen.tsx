import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { PersonAccountScreenStyle } from '@screens/account/PersonAccountScreen/PersonAccountScreen.style';
import { PersonAccountScreenProps } from '@screens/account/PersonAccountScreen/PersonAccountScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import {
    AcceptPeopleInvitationInterface,
    HangoutCreateInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { HangoutPicker } from '@components/general/HangoutPicker/HangoutPicker';

export const PersonAccountScreen = ({
    route
}: PersonAccountScreenProps): JSX.Element => {
    const {
        firstname,
        id,
        inviteAccepted: accepted = true,
        username,
        profilePicture
    } = route.params;

    const { firstname: name, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const [inviteAccepted, setInviteAccepted] = useState<boolean>(accepted);

    const navigation = useNavigation();

    const [isHangoutSent, setIsHangoutSent] = useState<boolean>(false);

    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();

    useEffect(() => {
        navigation.setOptions({
            title: username
        });
    }, [navigation, username]);

    const buttonText = useMemo((): string => {
        if (!inviteAccepted) {
            return 'Accept';
        }
        if (isHangoutSent) {
            return 'Sent ✅';
        }
        return 'Send';
    }, [inviteAccepted, isHangoutSent]);

    const acceptFriendInvite = useCallback(() => {
        postRequest<ResponseInterface, AcceptPeopleInvitationInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/accept/people/invitation',
            {
                id,
                value: 1,
                user,
                name,
                username
            }
        ).subscribe((response) => {
            if (response?.status) {
                setInviteAccepted(true);
            } else {
                Alert.alert("We apologize, invite couldn't be accepted");
            }
        });
    }, [id, name, user, username]);

    const sendHangout = useCallback(() => {
        postRequest<ResponseInterface, HangoutCreateInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/hangout',
            {
                user,
                name,
                username,
                time: dateTime,
                place
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setIsHangoutSent(true);
            }
        });
    }, [dateTime, name, place, user, username]);

    const onPress = useCallback(() => {
        if (inviteAccepted) {
            sendHangout();
        } else {
            acceptFriendInvite();
        }
    }, [acceptFriendInvite, inviteAccepted, sendHangout]);

    return (
        <View style={PersonAccountScreenStyle.container}>
            <View>
                <FastImage
                    source={{ uri: profilePicture }}
                    style={PersonAccountScreenStyle.image}
                />
                <Text style={PersonAccountScreenStyle.name}>{firstname}</Text>
            </View>
            {inviteAccepted && (
                <HangoutPicker
                    onDateTimeChange={setDateTime}
                    onPlaceChange={setPlace}
                />
            )}
            <TouchableOpacity
                onPress={onPress}
                style={PersonAccountScreenStyle.hangoutTouchableOpacity}
            >
                <Text style={PersonAccountScreenStyle.hangoutText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
