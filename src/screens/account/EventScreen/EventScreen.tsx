import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
    EventScreenDataInterface,
    EventScreenProps
} from '@screens/account/EventScreen/EventScreen.props';
import { EventScreenStyle } from '@screens/account/EventScreen/EventScreen.style';
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
import { formatDate } from '@functions/formatDate';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { HangoutActions } from '@components/general/HangoutActions/HangoutActions';

export const EventScreen = ({ route }: EventScreenProps): JSX.Element => {
    const {
        confirmed = 1,
        hangoutId,
        hangoutType = null,
        username
    } = route.params;

    const { firstname, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const [accepted, setAccepted] = useState<boolean>(confirmed === 1);
    const [data, setData] = useState<EventScreenDataInterface>();
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
        navigateTo(AccountStackNavigatorEnum.HangoutDetailScreen, {
            createdByUser: data?.createdBy === user,
            hangoutId,
            photo: data?.picture,
            title: data?.title,
            time: data?.time,
            plan: data?.place
        });
    }, [
        data?.createdBy,
        data?.picture,
        data?.place,
        data?.time,
        data?.title,
        hangoutId,
        navigateTo,
        user
    ]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TouchableOpacity onPress={openHangoutDetail}>
                    <Text style={EventScreenStyle.headerTitle}>
                        {data?.title}
                    </Text>
                </TouchableOpacity>
            ),
            ...(data?.createdBy === user && {
                headerRight: () => (
                    <HangoutActions
                        hangoutId={hangoutId}
                        usernames={usernames}
                    />
                )
            })
        });
    }, [
        data?.createdBy,
        data?.title,
        hangoutId,
        navigation,
        openHangoutDetail,
        user,
        usernames
    ]);

    useEffect(() => {
        if (data?.usernames?.length) {
            const usernamesArray = [];
            for (let i = 0; i < data?.usernames?.length; i += 1) {
                usernamesArray.push(data?.usernames[i].username);
            }
            setUsernames(usernamesArray);
        }
    }, [data?.usernames]);

    const accept = useCallback(() => {
        setAccepted(true);
        postRequest<ResponseInterface, AcceptHangoutInvitationInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/accept/hangout/invitation',
            {
                id: hangoutId,
                value: 1,
                user,
                username,
                name: firstname,
                type: hangoutType
            }
        ).subscribe();
    }, [firstname, hangoutId, hangoutType, user, username]);

    const onOpenChat = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ChatScreen, {
            title: data?.title,
            usernames,
            image: data?.picture
        });
    }, [navigateTo, data?.title, data?.picture, usernames]);

    return (
        <ScrollView contentContainerStyle={EventScreenStyle.contentContainer}>
            <View style={EventScreenStyle.alignItemsCenter}>
                <TouchableOpacity
                    disabled={!data?.picture}
                    onPress={() => openPhoto(data?.picture)}
                    style={EventScreenStyle.imageView}
                >
                    <FastImage
                        source={{ uri: data?.picture }}
                        style={EventScreenStyle.image}
                    />
                </TouchableOpacity>
                <Text style={EventScreenStyle.text}>{data?.place}</Text>
                <Text style={EventScreenStyle.text}>
                    {formatDate(new Date(getLocalDateTimeFromUTC(data?.time)))}
                </Text>
                <View style={EventScreenStyle.usersContainer}>
                    {data?.usernames?.map((value) => (
                        <View
                            key={value.username}
                            style={EventScreenStyle.userView}
                        >
                            <FastImage
                                source={{ uri: value?.profilePicture }}
                                style={[
                                    EventScreenStyle.userPhoto,
                                    !value.confirmed && EventScreenStyle.opacity
                                ]}
                            />
                            <Text
                                style={[
                                    EventScreenStyle.userText,
                                    !value.confirmed && EventScreenStyle.opacity
                                ]}
                            >
                                {value.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={EventScreenStyle.alignItemsCenter}>
                <TouchableOpacity
                    onPress={onOpenChat}
                    style={EventScreenStyle.row}
                >
                    <Text style={EventScreenStyle.buttonText}>Open chat</Text>
                </TouchableOpacity>

                {!accepted && (
                    <TouchableOpacity
                        onPress={accept}
                        style={EventScreenStyle.row}
                    >
                        <Text style={EventScreenStyle.buttonText}>Accept</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};
