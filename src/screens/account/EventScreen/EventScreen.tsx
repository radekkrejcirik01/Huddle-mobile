import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
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
    ResponseConversationCreateInterface,
    ResponseHangoutGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptHangoutInvitationInterface,
    ConversationsCreateInterface,
    HangoutGetInterface
} from '@interfaces/post/Post.inteface';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';

export const EventScreen = ({ route }: EventScreenProps): JSX.Element => {
    const { confirmed = 1, hangoutId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [accepted, setAccepted] = useState<boolean>(confirmed === 1);
    const [data, setData] = useState<EventScreenDataInterface>();

    useEffect(() => {
        postRequest<ResponseHangoutGetInterface, HangoutGetInterface>(
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/get/hangout',
            {
                id: hangoutId,
                username
            }
        ).subscribe((response: ResponseHangoutGetInterface) => {
            if (response?.status) {
                setData(response.data);
            }
        });
    }, [hangoutId, username]);

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
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/accept/hangout/invitation',
            {
                id: hangoutId,
                value: 1
            }
        ).subscribe();
    }, [hangoutId]);

    const onOpenChat = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ChatScreen);

        postRequest<
            ResponseConversationCreateInterface,
            ConversationsCreateInterface
        >(
            'https://x3u5q0e94f.execute-api.eu-central-1.amazonaws.com/messages/create/conversation',
            {
                usernames: data?.usernames
            }
        ).subscribe((response: ResponseConversationCreateInterface) => {
            if (response?.status) {
                Alert.alert(JSON.stringify(response));
            }
        });
    }, [navigateTo, data?.usernames]);

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
                    {data?.time}
                </Text>
            </View>
            {accepted ? (
                <View style={EventScreenStyle.buttonsRow}>
                    <TouchableOpacity
                        onPress={onOpenChat}
                        style={EventScreenStyle.row}
                    >
                        <Text style={EventScreenStyle.buttonText}>
                            Open chat
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={EventScreenStyle.buttonsRow}>
                    <TouchableOpacity
                        onPress={accept}
                        style={EventScreenStyle.row}
                    >
                        <Text style={EventScreenStyle.buttonText}>
                            Accept invite
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};
