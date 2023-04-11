import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
    HangoutScreenDataInterface,
    HangoutScreenProps,
    HangoutUserInterface
} from '@screens/account/HangoutScreen/HangoutScreen.props';
import { HangoutScreenStyle } from '@screens/account/HangoutScreen/HangoutScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseHangoutGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptHangoutInvitationInterface,
    HangoutGetInterface
} from '@interfaces/post/Post.inteface';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import { getLocalDateTimeFromUTC } from '@functions/getLocalDateTimeFromUTC';
import { formatDateTime } from '@functions/formatDateTime';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { HangoutActions } from '@components/general/HangoutActions/HangoutActions';

export const HangoutScreen = ({ route }: HangoutScreenProps): JSX.Element => {
    const {
        confirmed = 1,
        hangoutId,
        hangoutType = null,
        invitedBy
    } = route.params;

    const { firstname, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const [accepted, setAccepted] = useState<boolean>(confirmed === 1);
    const [data, setData] = useState<HangoutScreenDataInterface>();
    const [usernames, setUsernames] = useState<Array<string>>([]);

    const loadHangout = useCallback(() => {
        if (hangoutId) {
            postRequest<ResponseHangoutGetInterface, HangoutGetInterface>(
                'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/hangout',
                {
                    id: hangoutId,
                    username: user
                }
            ).subscribe((response: ResponseHangoutGetInterface) => {
                if (response?.status) {
                    setData(response.data);
                }
            });
        }
    }, [hangoutId, user]);

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadHangout
    );
    const navigation = useDefaultNavigation();
    const openPhoto = useOpenPhoto();

    const openHangoutDetail = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.HangoutDetailsScreen, {
            hangoutId
        });
    }, [hangoutId, navigateTo]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TouchableOpacity onPress={openHangoutDetail}>
                    <Text style={HangoutScreenStyle.headerTitle}>
                        {data?.title}
                    </Text>
                </TouchableOpacity>
            ),
            ...(data?.createdBy === user && {
                headerRight: () => <HangoutActions hangoutId={hangoutId} />
            })
        });
    }, [data, hangoutId, navigation, openHangoutDetail, user]);

    useEffect(() => {
        if (data?.usernames?.length) {
            const usernamesArray = [];
            for (let i = 0; i < data?.usernames?.length; i += 1) {
                usernamesArray.push(data?.usernames[i].username);
            }
            setUsernames(usernamesArray);
        }
    }, [data?.usernames]);

    const openUserAccount = useCallback(
        (item: HangoutUserInterface) => {
            navigateTo(AccountStackNavigatorEnum.PersonProfileScreen, {
                username: item.username,
                firstname: item.firstname,
                profilePicture: item.profilePicture
            });
        },
        [navigateTo]
    );

    const accept = useCallback(() => {
        setAccepted(true);
        postRequest<ResponseInterface, AcceptHangoutInvitationInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/accept/hangout/invitation',
            {
                id: hangoutId,
                value: 1,
                user,
                username: invitedBy,
                name: firstname,
                type: hangoutType
            }
        ).subscribe(() => {
            loadHangout();
        });
    }, [firstname, hangoutId, hangoutType, invitedBy, loadHangout, user]);

    const onOpenChat = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ConversationScreen, {
            createNewConversation: true,
            usernames
        });
    }, [navigateTo, usernames]);

    return (
        <ScrollView contentContainerStyle={HangoutScreenStyle.contentContainer}>
            <View style={HangoutScreenStyle.alignItemsCenter}>
                <TouchableOpacity
                    disabled={!data?.picture}
                    onPress={() => openPhoto(data?.picture)}
                    style={HangoutScreenStyle.imageView}
                >
                    <FastImage
                        source={{ uri: data?.picture }}
                        style={HangoutScreenStyle.image}
                    />
                </TouchableOpacity>
                <Text style={HangoutScreenStyle.text}>{data?.place}</Text>
                <Text style={HangoutScreenStyle.text}>
                    {formatDateTime(
                        new Date(getLocalDateTimeFromUTC(data?.time))
                    )}
                </Text>
                {data?.type === 'group_hangout' && (
                    <View style={HangoutScreenStyle.usersContainer}>
                        {data?.usernames?.map((value: HangoutUserInterface) => (
                            <TouchableOpacity
                                key={value.username}
                                onPress={() => openUserAccount(value)}
                                style={HangoutScreenStyle.userView}
                            >
                                <FastImage
                                    source={{
                                        uri: value?.profilePicture
                                    }}
                                    style={[
                                        HangoutScreenStyle.userPhoto,
                                        !value.confirmed &&
                                            HangoutScreenStyle.opacity
                                    ]}
                                />
                                <Text
                                    style={[
                                        HangoutScreenStyle.userText,
                                        !value.confirmed &&
                                            HangoutScreenStyle.opacity
                                    ]}
                                >
                                    {value.firstname}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
            <View style={HangoutScreenStyle.alignItemsCenter}>
                <TouchableOpacity
                    onPress={onOpenChat}
                    style={HangoutScreenStyle.row}
                >
                    <Text style={HangoutScreenStyle.buttonText}>Open chat</Text>
                </TouchableOpacity>

                {!accepted && (
                    <TouchableOpacity
                        onPress={accept}
                        style={HangoutScreenStyle.row}
                    >
                        <Text style={HangoutScreenStyle.buttonText}>
                            Accept
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};
