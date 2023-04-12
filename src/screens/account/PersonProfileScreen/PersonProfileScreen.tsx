import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, Keyboard, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import { PersonProfileScreenStyle } from '@screens/account/PersonProfileScreen/PersonProfileScreen.style';
import { PersonProfileScreenProps } from '@screens/account/PersonProfileScreen/PersonProfileScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseCheckInvitationsInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptFriendInvitationInterface,
    CheckFriendInvitationInterface,
    FriendCreateInvitationPostInterface,
    HangoutCreateInterface,
    RemoveFriendInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { PersonStateEnum } from '@screens/account/PersonProfileScreen/PersonProfileScreen.enum';

export const PersonProfileScreen = ({
    route
}: PersonProfileScreenProps): JSX.Element => {
    const {
        checkInvitation = true,
        firstname,
        id,
        username,
        profilePicture
    } = route.params;

    const { firstname: name, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const openPhoto = useOpenPhoto();
    const navigation = useNavigation();

    const { showActionSheetWithOptions } = useActionSheet();

    const [personState, setPersonState] = useState<PersonStateEnum>(
        checkInvitation ? PersonStateEnum.NotInvited : PersonStateEnum.Friends
    );

    const invitationId = useRef<number>(id);

    const removeFriend = useCallback(() => {
        postRequest<ResponseInterface, RemoveFriendInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/remove/friend',
            {
                user,
                username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                navigation.goBack();
            }
        });
    }, [navigation, user, username]);

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
                    removeFriend();
                }
            }
        );
    }, [removeFriend, showActionSheetWithOptions, username]);

    useEffect(() => {
        navigation.setOptions({
            title: firstname,
            headerRight: () => (
                <View style={PersonProfileScreenStyle.row}>
                    <TouchableOpacity onPress={openFriendStatus}>
                        <Text style={PersonProfileScreenStyle.friendStatus}>
                            Friends
                        </Text>
                    </TouchableOpacity>
                    <Text> ✅</Text>
                </View>
            )
        });
    }, [firstname, navigation, openFriendStatus]);

    useEffect(() => {
        if (checkInvitation) {
            postRequest<
                ResponseCheckInvitationsInterface,
                CheckFriendInvitationInterface
            >(
                'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/check/people/invitations',
                {
                    user,
                    username
                }
            ).subscribe((response) => {
                if (response?.status) {
                    if (!response?.data) {
                        setPersonState(PersonStateEnum.NotInvited);
                        return;
                    }

                    invitationId.current = response?.data?.id;

                    if (
                        response?.data?.user !== user &&
                        !response?.data?.confirmed
                    ) {
                        setPersonState(PersonStateEnum.AcceptFriendInvitation);
                    }

                    if (
                        response?.data?.user === user &&
                        !response?.data?.confirmed
                    ) {
                        setPersonState(
                            PersonStateEnum.WaitingForFriendInviteAccept
                        );
                    }

                    if (response?.data?.confirmed) {
                        setPersonState(PersonStateEnum.Friends);
                    }
                }
            });
        }
    }, [checkInvitation, user, username]);

    const buttonText = useMemo((): string => {
        if (personState === PersonStateEnum.NotInvited) {
            return 'Send friend invitation';
        }
        if (personState === PersonStateEnum.AcceptFriendInvitation) {
            return 'Accept friend invite';
        }
        if (personState === PersonStateEnum.Friends) {
            return `Let's hangout ${firstname}!`;
        }
        if (personState === PersonStateEnum.WaitingForFriendInviteAccept) {
            return null;
        }
        return 'Sent ✅'; // Hangout or friend invite sent
    }, [firstname, personState]);

    const acceptFriendInvite = useCallback(() => {
        postRequest<ResponseInterface, AcceptFriendInvitationInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/accept/people/invitation',
            {
                id: invitationId.current,
                value: 1,
                user,
                name,
                username
            }
        ).subscribe((response) => {
            if (response?.status) {
                setPersonState(PersonStateEnum.Friends);
            } else {
                Alert.alert("We apologize, invite couldn't be accepted");
            }
        });
    }, [name, user, username]);

    const sendHangout = useCallback(() => {
        postRequest<ResponseInterface, HangoutCreateInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/hangout',
            {
                user,
                name,
                username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setPersonState(PersonStateEnum.HangoutSent);
            }
        });
    }, [name, user, username]);

    const sendFriendInvitation = useCallback(() => {
        postRequest<ResponseInterface, FriendCreateInvitationPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/people/invitation',
            {
                user,
                username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setPersonState(PersonStateEnum.FriendInviteSent);
            }
        });
    }, [user, username]);

    const onPress = useCallback(() => {
        if (personState === PersonStateEnum.NotInvited) {
            sendFriendInvitation();
        }
        if (personState === PersonStateEnum.AcceptFriendInvitation) {
            acceptFriendInvite();
        }
        if (personState === PersonStateEnum.Friends) {
            sendHangout();
        }
    }, [acceptFriendInvite, personState, sendFriendInvitation, sendHangout]);

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
                        disabled={!profilePicture}
                        onPress={() => openPhoto(profilePicture)}
                        style={PersonProfileScreenStyle.imageView}
                    >
                        <FastImage
                            source={{ uri: profilePicture }}
                            style={PersonProfileScreenStyle.image}
                        />
                    </TouchableOpacity>
                </View>
                <View style={PersonProfileScreenStyle.alignItemsCenter}>
                    {personState ===
                    PersonStateEnum.WaitingForFriendInviteAccept ? (
                        <Text style={PersonProfileScreenStyle.text}>
                            Invite sent
                        </Text>
                    ) : (
                        <TouchableOpacity
                            onPress={onPress}
                            style={
                                PersonProfileScreenStyle.mainButtonTouchableOpacity
                            }
                        >
                            <Text style={PersonProfileScreenStyle.text}>
                                {buttonText}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
