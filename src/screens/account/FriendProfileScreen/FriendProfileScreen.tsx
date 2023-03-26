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
import { FriendProfileScreenStyle } from '@screens/account/FriendProfileScreen/FriendProfileScreen.style';
import { FriendProfileScreenProps } from '@screens/account/FriendProfileScreen/FriendProfileScreen.props';
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
import { HangoutPicker } from '@components/general/HangoutPicker/HangoutPicker';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { PersonStateEnum } from '@screens/account/FriendProfileScreen/FriendProfileScreen.enum';

export const FriendProfileScreen = ({
    route
}: FriendProfileScreenProps): JSX.Element => {
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

    const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

    const invitationId = useRef<number>(id);

    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();

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
                <View style={FriendProfileScreenStyle.row}>
                    <TouchableOpacity onPress={openFriendStatus}>
                        <Text style={FriendProfileScreenStyle.friendStatus}>
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
            return '👋';
        }
        if (personState === PersonStateEnum.WaitingForFriendInviteAccept) {
            return null;
        }
        return 'Sent ✅'; // Hangout or friend invite sent
    }, [personState]);

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
                username,
                time: dateTime,
                place
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setPersonState(PersonStateEnum.HangoutSent);
            }
        });
    }, [dateTime, name, place, user, username]);

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
            contentContainerStyle={FriendProfileScreenStyle.container}
        >
            <KeyboardAvoidingView
                style={FriendProfileScreenStyle.container}
                contentContainerStyle={
                    FriendProfileScreenStyle.contentContainer
                }
            >
                <View style={FriendProfileScreenStyle.alignItemsCenter}>
                    <TouchableOpacity
                        disabled={!profilePicture}
                        onPress={() => openPhoto(profilePicture)}
                        style={FriendProfileScreenStyle.imageView}
                    >
                        <FastImage
                            source={{ uri: profilePicture }}
                            style={FriendProfileScreenStyle.image}
                        />
                    </TouchableOpacity>
                </View>
                <HangoutPicker
                    isVisible={
                        detailsVisible &&
                        personState !== PersonStateEnum.HangoutSent
                    }
                    onDateTimeChange={setDateTime}
                    onPlaceChange={setPlace}
                />
                <View style={FriendProfileScreenStyle.alignItemsCenter}>
                    {personState ===
                    PersonStateEnum.WaitingForFriendInviteAccept ? (
                        <Text style={FriendProfileScreenStyle.text}>
                            Friend invite sent
                        </Text>
                    ) : (
                        <TouchableOpacity
                            onPress={onPress}
                            style={
                                FriendProfileScreenStyle.mainButtonTouchableOpacity
                            }
                        >
                            <Text style={FriendProfileScreenStyle.text}>
                                {buttonText}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <View style={FriendProfileScreenStyle.addDetailsButtonView}>
                        {personState === PersonStateEnum.Friends &&
                            !detailsVisible && (
                                <TouchableOpacity
                                    onPress={() => setDetailsVisible(true)}
                                >
                                    <Text style={FriendProfileScreenStyle.text}>
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
