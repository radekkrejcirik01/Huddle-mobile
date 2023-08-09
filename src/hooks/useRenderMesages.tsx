import React, { useCallback } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@hooks/useNavigation';
import { useHuddleActions } from '@hooks/useHuddleActions';
import {
    HuddleItemInterface,
    MessageItemProps
} from '@screens/account/ConversationScreen/ConversationScreen.props';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { MessageReactionPostInterface } from '@interfaces/post/Post.inteface';
import { MessageListItemAnimated } from '@components/conversation/MessagesLisItemAnimated/MessageListItemAnimated';
import { MessageListItem } from '@components/conversation/MessagesLisItem/MessageListItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useRenderMesages = (
    messages: Array<MessageItemProps>,
    conversationId: number,
    name: string,
    profilePhoto: string,
    loadMessages: (lastId?: number) => void,
    addReaction: (messageId: number, value: string) => void,
    onReplyHuddle: (item: HuddleItemInterface) => void,
    onReplyMessage: (item: MessageItemProps) => void
): {
    renderMessageItem: ({
        item
    }: ListRenderItemInfo<MessageItemProps>) => JSX.Element;
    keyMessageExtractor: (item: MessageItemProps, index: number) => string;
    onEndReached: () => void;
} => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { showActionSheetWithOptions } = useActionSheet();
    const { openHuddleActions, onHuddleLikePress, openHuddleProfile } =
        useHuddleActions(loadMessages, onReplyHuddle);

    const react = useCallback(
        (item: MessageItemProps, reaction: string) => {
            addReaction(item.id, reaction);

            postRequestUser<ResponseInterface, MessageReactionPostInterface>(
                'message-react',
                {
                    receiver: item.sender,
                    message: item.message,
                    conversationId,
                    messageId: item.id,
                    value: reaction
                }
            ).subscribe();
        },
        [addReaction, conversationId]
    );

    const openMessageActions = useCallback(
        (item: MessageItemProps) => {
            const options = [
                '👍',
                '😂',
                '❤️',
                'Reply',
                !item?.url && 'Copy',
                'Cancel'
            ].filter(Boolean);

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: item?.url ? 4 : 5,
                    userInterfaceStyle: 'dark'
                },
                (selectedIndex: number) => {
                    if (options[selectedIndex] === 'Copy') {
                        Clipboard.setString(item?.message);
                    }
                    if (options[selectedIndex] === 'Reply') {
                        onReplyMessage(item);
                    }
                    if (options[selectedIndex] === '❤️') {
                        react(item, '❤️');
                    }
                    if (options[selectedIndex] === '😂') {
                        react(item, '😂');
                    }
                    if (options[selectedIndex] === '👍') {
                        react(item, '👍');
                    }
                }
            );
        },
        [onReplyMessage, react, showActionSheetWithOptions]
    );

    const openHuddle = useCallback(
        (id: number) =>
            navigateTo(AccountStackNavigatorEnum.HuddleScreen, {
                huddleId: id
            }),
        [navigateTo]
    );

    const renderMessageItem = useCallback(
        ({ item, index }: ListRenderItemInfo<MessageItemProps>): JSX.Element =>
            item?.animate ? (
                <MessageListItemAnimated
                    item={item}
                    onLongPress={() => openMessageActions(item)}
                    hasSpace={
                        messages[index]?.sender !==
                            messages[index + 1]?.sender &&
                        !messages[index + 1]?.huddle
                    }
                />
            ) : (
                <MessageListItem
                    item={item}
                    name={name}
                    profilePhoto={profilePhoto}
                    onMessageLongPress={() => openMessageActions(item)}
                    onHuddlePress={() => openHuddle(item.huddle.id)}
                    onHuddleProfilePress={() => openHuddleProfile(item.huddle)}
                    onHuddleLikePress={() => onHuddleLikePress(item.huddle)}
                    onHuddleLongPress={() => openHuddleActions(item.huddle)}
                    onHuddleMorePress={() => openHuddleActions(item.huddle)}
                    hasSpace={
                        messages[index]?.sender !==
                            messages[index + 1]?.sender &&
                        !messages[index + 1]?.huddle
                    }
                    isMessageAbove={
                        !!messages[index]?.huddle &&
                        !messages[index + 1]?.huddle
                    }
                />
            ),
        [
            messages,
            name,
            onHuddleLikePress,
            openHuddle,
            openHuddleActions,
            openHuddleProfile,
            openMessageActions,
            profilePhoto
        ]
    );

    const keyMessageExtractor = (
        item: MessageItemProps,
        index: number
    ): string => item.id.toString() + index.toString();

    const onEndReached = useCallback(() => {
        if (messages?.length >= 20) {
            loadMessages(messages[messages?.length - 1].id);
        }
    }, [loadMessages, messages]);

    return { renderMessageItem, keyMessageExtractor, onEndReached };
};
