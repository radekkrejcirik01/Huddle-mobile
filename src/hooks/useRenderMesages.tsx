import React, { useCallback } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@hooks/useNavigation';
import { useHuddleActions } from '@hooks/useHuddleActions';
import {
    HuddleItemInterface,
    MessageProps
} from '@screens/account/ConversationScreen/ConversationScreen.props';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { MessageReactionPostInterface } from '@interfaces/post/Post.inteface';
import { MessageItemAnimated } from '@components/conversation/MessageItemAnimated/MessageItemAnimated';
import { MessageItem } from '@components/conversation/MessageItem/MessageItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { MessageHuddleItem } from '@components/conversation/MessageHuddleItem/MessageHuddleItem';

export const useRenderMesages = (
    messages: Array<MessageProps>,
    conversationId: number,
    name: string,
    profilePhoto: string,
    loadMessages: (lastId?: number) => void,
    addReaction: (messageId: number, value: string) => void,
    onReplyHuddle: (item: HuddleItemInterface) => void,
    onReplyMessage: (item: MessageProps) => void,
    onHuddleOpenLikes: (id: number) => void
): {
    renderMessageItem: ({
        item
    }: ListRenderItemInfo<MessageProps>) => JSX.Element;
    keyMessageExtractor: (item: MessageProps, index: number) => string;
    onEndReached: () => void;
} => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { showActionSheetWithOptions } = useActionSheet();
    const { openHuddleActions, onHuddleLikePress, openHuddleProfile } =
        useHuddleActions(loadMessages, onReplyHuddle, loadMessages);

    const react = useCallback(
        (item: MessageProps, reaction: string) => {
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
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadMessages();
                }
            });
        },
        [addReaction, conversationId, loadMessages]
    );

    const openMessageActions = useCallback(
        (item: MessageProps) => {
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
        ({ item, index }: ListRenderItemInfo<MessageProps>): JSX.Element => {
            if (item?.animate) {
                return (
                    <MessageItemAnimated
                        item={item}
                        hasSpace={
                            messages[index]?.sender !==
                                messages[index + 1]?.sender &&
                            !messages[index + 1]?.huddle
                        }
                    />
                );
            }
            if (item?.huddle) {
                return (
                    <MessageHuddleItem
                        item={item}
                        onHuddlePress={() => openHuddle(item.huddle.id)}
                        onHuddleProfilePress={() =>
                            openHuddleProfile(item.huddle)
                        }
                        onHuddleLikePress={() => onHuddleLikePress(item.huddle)}
                        onHuddleLongPress={() => openHuddleActions(item.huddle)}
                        onHuddleOpenLikes={() =>
                            onHuddleOpenLikes(item.huddle.id)
                        }
                        isMessageAbove={
                            !!messages[index]?.huddle &&
                            !messages[index + 1]?.huddle
                        }
                    />
                );
            }
            return (
                <MessageItem
                    item={item}
                    name={name}
                    profilePhoto={profilePhoto}
                    onMessageLongPress={() => openMessageActions(item)}
                    hasSpace={
                        messages[index]?.sender !==
                            messages[index + 1]?.sender &&
                        !messages[index + 1]?.huddle
                    }
                    hasProfilePhoto={
                        messages[index]?.sender !==
                            messages[index - 1]?.sender ||
                        (messages[index - 1]?.huddle &&
                            messages[index - 1]?.sender ===
                                messages[index]?.sender)
                    }
                />
            );
        },
        [
            messages,
            name,
            onHuddleLikePress,
            onHuddleOpenLikes,
            openHuddle,
            openHuddleActions,
            openHuddleProfile,
            openMessageActions,
            profilePhoto
        ]
    );

    const keyMessageExtractor = (item: MessageProps, index: number): string =>
        item.id.toString() + index.toString();

    const onEndReached = useCallback(() => {
        if (messages?.length >= 20) {
            loadMessages(messages[messages?.length - 1].id);
        }
    }, [loadMessages, messages]);

    return { renderMessageItem, keyMessageExtractor, onEndReached };
};
