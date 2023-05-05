import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { ChatsItem } from '@components/chats/ChatsItem/ChatsItem';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ConversationRemoveInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';

export const useMessagesListRenders = (
    data: Array<ChatsListDataProps>,
    onItemPress: (item: ChatsListDataProps) => void,
    onRefresh: () => void
): {
    renderItem: ({
        item
    }: ListRenderItemInfo<ChatsListDataProps>) => JSX.Element;
    keyExtractor: (item: ChatsListDataProps, index: number) => string;
    refreshControl: JSX.Element;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [refreshing, setRefreshing] = useState(false);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            onRefresh();
        }, 1000);
    }, [onRefresh]);

    const deleteConversation = useCallback(
        (id: number) => {
            postRequest<ResponseInterface, ConversationRemoveInterface>(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/remove/conversation',
                {
                    conversationId: id,
                    username
                }
            ).subscribe(() => {
                onRefresh();
            });
        },
        [onRefresh, username]
    );

    const renderItem = ({
        item
    }: ListRenderItemInfo<ChatsListDataProps>): JSX.Element => (
        <ChatsItem
            key={item.id}
            item={item}
            onPress={onItemPress}
            onDelete={deleteConversation}
        />
    );

    const keyExtractor = (item: ChatsListDataProps): string =>
        item.id.toString();

    const refreshControl = useMemo(
        (): JSX.Element => (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
                tintColor="white"
            />
        ),
        [refresh, refreshing]
    );

    return { renderItem, keyExtractor, refreshControl };
};
