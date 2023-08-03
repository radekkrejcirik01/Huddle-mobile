import React, { useCallback } from 'react';
import { Alert } from 'react-native';
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
    loadMessages: (lastId?: number) => void,
    addReaction: (messageId: number, value: string) => void
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
        useHuddleActions(loadMessages);

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

    const showActionSheet = useCallback(
        (item: MessageItemProps) => {
            const options = [
                '👍',
                '😂',
                '❤️',
                'Report',
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
                    if (options[selectedIndex] === 'Report') {
                        Alert.alert(
                            'Thank you for reporting. Our team will take a look 🙂'
                        );
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
        [react, showActionSheetWithOptions]
    );

    const openHuddle = useCallback(
        (item: HuddleItemInterface) =>
            navigateTo(AccountStackNavigatorEnum.HuddleScreen, {
                huddle: item
            }),
        [navigateTo]
    );

    const renderMessageItem = useCallback(
        ({ item, index }: ListRenderItemInfo<MessageItemProps>): JSX.Element =>
            item?.animate ? (
                <MessageListItemAnimated
                    item={item}
                    onLongPress={() => showActionSheet(item)}
                    hasSpace={
                        messages[index]?.sender !==
                            messages[index + 1]?.sender &&
                        !messages[index + 1]?.huddle
                    }
                />
            ) : (
                <MessageListItem
                    item={item}
                    onMessageLongPress={() => showActionSheet(item)}
                    onHuddlePress={() => openHuddle(item.huddle)}
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
            onHuddleLikePress,
            openHuddle,
            openHuddleActions,
            openHuddleProfile,
            showActionSheet
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
