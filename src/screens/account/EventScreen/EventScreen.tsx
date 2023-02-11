import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
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

export const EventScreen = ({ route }: EventScreenProps): JSX.Element => {
    const { confirmed = 1, hangoutId, username } = route.params;

    const { firstname, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [accepted, setAccepted] = useState<boolean>(confirmed === 1);
    const [data, setData] = useState<EventScreenDataInterface>();

    useEffect(() => {
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
    }, [hangoutId, user]);

    const pictures = useMemo(
        (): JSX.Element => (
            <View style={EventScreenStyle.imageView}>
                <FastImage
                    style={EventScreenStyle.image}
                    source={{ uri: data?.picture }}
                />
            </View>
        ),
        [data?.picture]
    );

    const accept = useCallback(() => {
        setAccepted(true);
        postRequest<ResponseInterface, AcceptHangoutInvitationInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/accept/hangout/invitation',
            {
                id: hangoutId,
                value: 1,
                user,
                username,
                name: firstname
            }
        ).subscribe();
    }, [firstname, hangoutId, user, username]);

    const onOpenChat = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ChatScreen, {
            title: data?.title,
            usernames: data?.usernames,
            image: data?.picture
        });
    }, [navigateTo, data?.title, data?.usernames, data?.picture]);

    return (
        <ScrollView contentContainerStyle={EventScreenStyle.contentContainer}>
            <View>
                <View style={EventScreenStyle.picturesView}>{pictures}</View>
                <Text style={EventScreenStyle.nameText}>{data?.title}</Text>
                <Text style={EventScreenStyle.nameText}>{data?.place}</Text>
                <Text
                    style={[
                        EventScreenStyle.nameText,
                        EventScreenStyle.timeText
                    ]}
                >
                    {formatDate(new Date(getLocalDateTimeFromUTC(data?.time)))}
                </Text>
            </View>
            {accepted ? (
                <TouchableOpacity
                    onPress={onOpenChat}
                    style={EventScreenStyle.row}
                >
                    <Text style={EventScreenStyle.buttonText}>Open chat</Text>
                </TouchableOpacity>
            ) : (
                <View>
                    <TouchableOpacity
                        onPress={accept}
                        style={EventScreenStyle.row}
                    >
                        <Text style={EventScreenStyle.buttonText}>
                            Suggest changes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={accept}
                        style={EventScreenStyle.row}
                    >
                        <Text style={EventScreenStyle.buttonText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};
