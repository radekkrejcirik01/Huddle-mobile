import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { useRefresh } from '@hooks/useRefresh';
import { ChatsItem } from '@components/chats/ChatsItem/ChatsItem';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useRenderChats = (
    chats: Array<ChatsListDataProps>,
    loadChats: (lastId?: number) => void
): {
    renderChatItem: ({
        item
    }: ListRenderItemInfo<ChatsListDataProps>) => JSX.Element;
    keyChatExtractor: (item: ChatsListDataProps, index: number) => string;
    refreshControl: JSX.Element;
    onEndReached: () => void;
} => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { refreshing, onRefresh } = useRefresh(loadChats);

    const openConversation = useCallback(
        (item: ChatsListDataProps) => {
            navigateTo(AccountStackNavigatorEnum.ConversationScreen, {
                conversationId: item.id,
                name: item?.name,
                profilePhoto: item?.profilePhoto
            });
        },
        [navigateTo]
    );

    const renderChatItem = useCallback(
        ({ item }: ListRenderItemInfo<ChatsListDataProps>): JSX.Element => (
            <ChatsItem item={item} onPress={openConversation} />
        ),
        [openConversation]
    );

    const keyChatExtractor = (item: ChatsListDataProps): string =>
        item.id.toString();

    const refreshControl = useMemo(
        (): JSX.Element => (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="white"
            />
        ),
        [onRefresh, refreshing]
    );

    const onEndReached = useCallback(() => {
        if (chats?.length >= 15) {
            loadChats(chats[chats?.length - 1].id);
        }
    }, [chats, loadChats]);

    return { renderChatItem, keyChatExtractor, refreshControl, onEndReached };
};
