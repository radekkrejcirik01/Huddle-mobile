import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import { PersonProfileScreenStyle } from '@screens/account/PersonProfileScreen/PersonProfileScreen.style';
import { PersonProfileScreenProps } from '@screens/account/PersonProfileScreen/PersonProfileScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    deleteRequestUser,
    getRequestUser,
    postRequestUser,
    putRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseGetPersonInviteInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptPeopleInvitationInterface,
    AddPersonInvitePostInterface,
    NotifyInterface,
    RemovePersonInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { PersonStateEnum } from '@screens/account/PersonProfileScreen/PersonProfileScreen.enum';

export const PersonProfileScreen = ({
    route
}: PersonProfileScreenProps): JSX.Element => {
    const { username, name, profilePhoto } = route.params;

    const { firstname, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const navigation = useNavigation();
    const { showActionSheetWithOptions } = useActionSheet();
    const openPhoto = useOpenPhoto();

    const [personState, setPersonState] = useState<PersonStateEnum>();

    const loadPerson = useCallback(() => {
        getRequestUser<ResponseGetPersonInviteInterface>(
            `person/${user}/${username}`
        ).subscribe((response) => {
            if (response?.status) {
                if (!response?.data) {
                    setPersonState(PersonStateEnum.NotInvited);
                    return;
                }

                if (response?.data?.accepted) {
                    setPersonState(PersonStateEnum.Friends);
                    return;
                }

                setPersonState(
                    response?.data?.sender === user
                        ? PersonStateEnum.WaitingForFriendInviteAccept
                        : PersonStateEnum.AcceptFriendInvitation
                );
            }
        });
    }, [user, username]);

    const sendFriendInvite = useCallback(() => {
        postRequestUser<ResponseInterface, AddPersonInvitePostInterface>(
            'person',
            {
                sender: user,
                receiver: username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                loadPerson();
            }
        });
    }, [loadPerson, user, username]);

    const acceptPersonInvite = useCallback(() => {
        putRequestUser<ResponseInterface, AcceptPeopleInvitationInterface>(
            'person',
            {
                sender: user,
                receiver: username
            }
        ).subscribe((response) => {
            if (response?.status) {
                loadPerson();
            }
        });
    }, [loadPerson, user, username]);

    const notify = useCallback(() => {
        postRequestUser<ResponseInterface, NotifyInterface>('notify', {
            sender: user,
            senderName: firstname,
            receiver: username
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setPersonState(PersonStateEnum.NotifySent);
            }
        });
    }, [firstname, user, username]);

    const unfriend = useCallback(() => {
        deleteRequestUser<ResponseInterface, RemovePersonInterface>(
            `person/${user}/${username}`
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                navigation.goBack();
            }
        });
    }, [navigation, user, username]);

    useEffect(() => loadPerson(), [loadPerson]);

    const statusText = useMemo((): string => {
        if (personState === PersonStateEnum.Friends) {
            return 'Friends';
        }
        if (personState === PersonStateEnum.WaitingForFriendInviteAccept) {
            return 'Invited';
        }
        if (personState === PersonStateEnum.NotifySent) {
            return 'Sent';
        }
        return null;
    }, [personState]);

    const openFriendStatus = useCallback(() => {
        const options = ['Unfriend', 'Cancel'];

        showActionSheetWithOptions(
            {
                cancelButtonIndex: 1,
                options,
                userInterfaceStyle: 'dark',
                title: username
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    unfriend();
                }
            }
        );
    }, [showActionSheetWithOptions, unfriend, username]);

    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerRight: () =>
                !!statusText && (
                    <View style={PersonProfileScreenStyle.row}>
                        <TouchableOpacity onPress={openFriendStatus}>
                            <Text style={PersonProfileScreenStyle.friendStatus}>
                                {statusText}
                            </Text>
                        </TouchableOpacity>
                        <Text> ✅</Text>
                    </View>
                )
        });
    }, [name, navigation, openFriendStatus, personState, statusText]);

    const buttonText = useMemo((): string => {
        if (personState === PersonStateEnum.NotInvited) {
            return 'Send a friend invite';
        }
        if (personState === PersonStateEnum.AcceptFriendInvitation) {
            return 'Accept friend invite';
        }
        if (personState === PersonStateEnum.Friends) {
            return `Let's hangout ${firstname}!`;
        }
        return null;
    }, [firstname, personState]);

    const action = useCallback(() => {
        if (personState === PersonStateEnum.NotInvited) {
            sendFriendInvite();
        }
        if (personState === PersonStateEnum.AcceptFriendInvitation) {
            acceptPersonInvite();
        }
        if (personState === PersonStateEnum.Friends) {
            notify();
        }
    }, [acceptPersonInvite, notify, personState, sendFriendInvite]);

    return (
        <ScrollView
            onScrollBeginDrag={Keyboard.dismiss}
            contentContainerStyle={PersonProfileScreenStyle.container}
        >
            <KeyboardAvoidingView
                style={PersonProfileScreenStyle.container}
                contentContainerStyle={
                    PersonProfileScreenStyle.contentContainer
                }
            >
                <View style={PersonProfileScreenStyle.alignItemsCenter}>
                    <TouchableOpacity
                        disabled={!profilePhoto}
                        onPress={() => openPhoto(profilePhoto)}
                        style={PersonProfileScreenStyle.imageView}
                    >
                        <FastImage
                            source={{ uri: profilePhoto }}
                            style={PersonProfileScreenStyle.image}
                        />
                    </TouchableOpacity>
                </View>
                {buttonText && (
                    <View style={PersonProfileScreenStyle.alignItemsCenter}>
                        <TouchableOpacity
                            onPress={action}
                            style={
                                PersonProfileScreenStyle.mainButtonTouchableOpacity
                            }
                        >
                            <Text style={PersonProfileScreenStyle.text}>
                                {buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
