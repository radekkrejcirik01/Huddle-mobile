import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { useRefresh } from '@hooks/useRefresh';
import { ChatItem } from '@components/chats/ChatItem/ChatItem';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import {
    deleteRequestUser,
    getRequestUser,
    postRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseConversationLikedInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ConversationLikePostInterface } from '@interfaces/post/Post.inteface';

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
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { showActionSheetWithOptions } = useActionSheet();
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

    const likeConversation = useCallback(
        (conversationId: number) => {
            postRequestUser<ResponseInterface, ConversationLikePostInterface>(
                'conversation-like',
                {
                    conversationId
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadChats();
                }
            });
        },
        [loadChats]
    );

    const removeConversationLike = useCallback(
        (conversationId: number) => {
            deleteRequestUser<ResponseInterface>(
                `conversation-like/${conversationId}`
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadChats();
                }
            });
        },
        [loadChats]
    );

    const openActions = useCallback(
        (conversationId: number, name: string) => {
            getRequestUser<ResponseConversationLikedInterface>(
                `conversation-like/${conversationId}`
            ).subscribe((response: ResponseConversationLikedInterface) => {
                if (response?.status) {
                    const options = [
                        response?.isLiked === 1 ? 'Remove like' : 'Like ❤️',
                        'Cancel'
                    ];

                    showActionSheetWithOptions(
                        {
                            options,
                            title: name,
                            cancelButtonIndex: 1,
                            userInterfaceStyle: 'dark'
                        },
                        (selectedIndex: number) => {
                            if (options[selectedIndex] === 'Like ❤️') {
                                likeConversation(conversationId);
                            }
                            if (options[selectedIndex] === 'Remove like') {
                                removeConversationLike(conversationId);
                            }
                        }
                    );
                }
            });
        },
        [likeConversation, removeConversationLike, showActionSheetWithOptions]
    );

    const renderChatItem = useCallback(
        ({ item }: ListRenderItemInfo<ChatsListDataProps>): JSX.Element => (
            <ChatItem
                item={item}
                onPress={() => openConversation(item)}
                onLongPress={() => openActions(item.id, item.name)}
                hasSeen={item.sender === username}
            />
        ),
        [openActions, openConversation, username]
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
