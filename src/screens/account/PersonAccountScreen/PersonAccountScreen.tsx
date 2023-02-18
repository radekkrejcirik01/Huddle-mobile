import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Keyboard, ScrollView, Text, View } from 'react-native';
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
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { useOpenPhoto } from '@hooks/useOpenPhoto';

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
    const [addDetails, setAddDetails] = useState<boolean>(false);

    const openPhoto = useOpenPhoto();
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
        <ScrollView
            onScrollBeginDrag={Keyboard.dismiss}
            contentContainerStyle={PersonAccountScreenStyle.container}
        >
            <KeyboardAvoidingView
                style={PersonAccountScreenStyle.container}
                contentContainerStyle={
                    PersonAccountScreenStyle.contentContainer
                }
            >
                <View style={PersonAccountScreenStyle.alignItemsCenter}>
                    <TouchableOpacity
                        disabled={!profilePicture}
                        onPress={() => openPhoto(profilePicture)}
                        style={PersonAccountScreenStyle.imageView}
                    >
                        <FastImage
                            source={{ uri: profilePicture }}
                            style={PersonAccountScreenStyle.image}
                        />
                    </TouchableOpacity>
                    <Text style={PersonAccountScreenStyle.name}>
                        {firstname}
                    </Text>
                </View>
                <HangoutPicker
                    isVisible={addDetails && !isHangoutSent}
                    onDateTimeChange={setDateTime}
                    onPlaceChange={setPlace}
                />
                <View style={PersonAccountScreenStyle.alignItemsCenter}>
                    <TouchableOpacity
                        onPress={onPress}
                        style={
                            PersonAccountScreenStyle.mainButtonTouchableOpacity
                        }
                    >
                        <Text style={PersonAccountScreenStyle.text}>
                            {buttonText}
                        </Text>
                    </TouchableOpacity>
                    <View style={PersonAccountScreenStyle.addDetailsButtonView}>
                        {inviteAccepted && !addDetails && (
                            <TouchableOpacity
                                onPress={() => setAddDetails(true)}
                            >
                                <Text style={PersonAccountScreenStyle.text}>
                                    Add details
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
