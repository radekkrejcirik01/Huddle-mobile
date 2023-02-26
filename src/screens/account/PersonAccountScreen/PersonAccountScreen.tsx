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
import FastImage from 'react-native-fast-image';
import { PersonAccountScreenStyle } from '@screens/account/PersonAccountScreen/PersonAccountScreen.style';
import { PersonAccountScreenProps } from '@screens/account/PersonAccountScreen/PersonAccountScreen.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseCheckInvitationsInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptPeopleInvitationInterface,
    CheckPeopleInvitationInterface,
    HangoutCreateInterface,
    PeopleCreateInvitationPostInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { HangoutPicker } from '@components/general/HangoutPicker/HangoutPicker';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { PersonStateEnum } from '@screens/account/PersonAccountScreen/PersonAccountScreen.enum';

export const PersonAccountScreen = ({
    route
}: PersonAccountScreenProps): JSX.Element => {
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

    const [personState, setPersonState] = useState<PersonStateEnum>(
        checkInvitation ? PersonStateEnum.NotInvited : PersonStateEnum.Friends
    );

    const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

    const invitationId = useRef<number>(id);

    const openPhoto = useOpenPhoto();
    const navigation = useNavigation();

    const [dateTime, setDateTime] = useState<string>();
    const [place, setPlace] = useState<string>();

    useEffect(() => {
        navigation.setOptions({
            title: username
        });
    }, [navigation, username]);

    useEffect(() => {
        if (checkInvitation) {
            postRequest<
                ResponseCheckInvitationsInterface,
                CheckPeopleInvitationInterface
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
            return 'Send';
        }
        if (personState === PersonStateEnum.WaitingForFriendInviteAccept) {
            return null;
        }
        return 'Sent ✅'; // Hangout or friend invite sent
    }, [personState]);

    const acceptFriendInvite = useCallback(() => {
        postRequest<ResponseInterface, AcceptPeopleInvitationInterface>(
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
        postRequest<ResponseInterface, PeopleCreateInvitationPostInterface>(
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
                    isVisible={
                        detailsVisible &&
                        personState !== PersonStateEnum.HangoutSent
                    }
                    onDateTimeChange={setDateTime}
                    onPlaceChange={setPlace}
                />
                <View style={PersonAccountScreenStyle.alignItemsCenter}>
                    {personState ===
                    PersonStateEnum.WaitingForFriendInviteAccept ? (
                        <Text style={PersonAccountScreenStyle.text}>
                            Friend invite sent
                        </Text>
                    ) : (
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
                    )}
                    <View style={PersonAccountScreenStyle.addDetailsButtonView}>
                        {personState === PersonStateEnum.Friends &&
                            !detailsVisible && (
                                <TouchableOpacity
                                    onPress={() => setDetailsVisible(true)}
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
