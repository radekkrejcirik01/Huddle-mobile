import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { useMessagesListRenders } from '@hooks/useMessagesListRenders';
import { MessagesListDataProps } from '@screens/account/MessagesScreen/MessagesScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseConversationsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    ReadMessageInterface,
    UserGetPostInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { MessagesScreenStyle } from './MessagesScreen.style';

export const MessagesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [data, setData] = useState<Array<MessagesListDataProps>>([]);

    const loadConversations = useCallback(() => {
        postRequest<ResponseConversationsGetInterface, UserGetPostInterface>(
            'https://x3u5q0e94f.execute-api.eu-central-1.amazonaws.com/messages/get/conversations/0',
            {
                username
            }
        ).subscribe((response: ResponseConversationsGetInterface) => {
            if (response?.status) {
                setData(response?.data);
            }
        });
    }, [username]);

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadConversations
    );

    const updateMessageRead = useCallback(
        (user: string) => {
            postRequest<ResponseInterface, ReadMessageInterface>(
                'https://x3u5q0e94f.execute-api.eu-central-1.amazonaws.com/messages/update/read',
                {
                    username,
                    user
                }
            ).subscribe();
        },
        [username]
    );

    const onItemPress = useCallback(
        (item: MessagesListDataProps) => {
            navigateTo(AccountStackNavigatorEnum.ChatScreen, {
                username: item?.username
            });

            if (!item.isRead) {
                updateMessageRead(item.username);
            }
        },
        [navigateTo, updateMessageRead]
    );

    const onRefresh = useCallback(() => {
        loadConversations();
    }, [loadConversations]);

    const { getItemType, renderItem, keyExtractor, refreshControl } =
        useMessagesListRenders(data, onItemPress, onRefresh);

    return (
        <View style={MessagesScreenStyle.container}>
            <FlashList
                data={data}
                getItemType={getItemType}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={68}
                contentContainerStyle={MessagesScreenStyle.contentContainer}
            />
        </View>
    );
};
