import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { MessageInteractionPostInterface } from '@interfaces/post/Post.inteface';
import { MessageListItemAnimated } from '@components/conversation/MessagesLisItemAnimated/MessageListItemAnimated';
import { MessageListItem } from '@components/conversation/MessagesLisItem/MessageListItem';

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
    const { showActionSheetWithOptions } = useActionSheet();

    const react = useCallback(
        (item: MessageItemProps, interaction: string) => {
            addReaction(item.id, interaction);

            postRequestUser<ResponseInterface, MessageInteractionPostInterface>(
                'message-react',
                {
                    receiver: item.sender,
                    message: item.message,
                    conversationId,
                    messageId: item.id,
                    value: interaction
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
                    cancelButtonIndex: 5,
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

    const renderMessageItem = useCallback(
        ({ item, index }: ListRenderItemInfo<MessageItemProps>): JSX.Element =>
            item?.animate ? (
                <MessageListItemAnimated
                    item={item}
                    onLongPress={() => showActionSheet(item)}
                    hasSpace={
                        messages[index]?.sender !== messages[index + 1]?.sender
                    }
                />
            ) : (
                <MessageListItem
                    item={item}
                    onLongPress={() => showActionSheet(item)}
                    hasSpace={
                        messages[index]?.sender !== messages[index + 1]?.sender
                    }
                />
            ),
        [messages, showActionSheet]
    );

    const keyMessageExtractor = (item: MessageItemProps): string =>
        item?.id?.toString();

    const onEndReached = useCallback(() => {
        if (messages?.length >= 20) {
            loadMessages(messages[messages?.length - 1].id);
        }
    }, [loadMessages, messages]);

    return { renderMessageItem, keyMessageExtractor, onEndReached };
};
