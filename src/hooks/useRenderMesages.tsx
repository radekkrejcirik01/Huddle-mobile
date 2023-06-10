import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { MessageListItem } from '@components/conversation/MessagesLisItem/MessageListItem';
import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export const useRenderMesages = (
    messages: Array<MessageItemProps>,
    loadMessages: (lastId?: number) => void
): {
    renderMessageItem: ({
        item
    }: ListRenderItemInfo<MessageItemProps>) => JSX.Element;
    keyMessageExtractor: (item: MessageItemProps, index: number) => string;
    onEndReached: () => void;
} => {
    const { showActionSheetWithOptions } = useActionSheet();

    const showActionSheet = useCallback(
        (item: MessageItemProps) => {
            const options = [!item?.url && 'Copy', 'Report', 'Cancel'].filter(
                Boolean
            );

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 2,
                    userInterfaceStyle: 'dark'
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        Clipboard.setString(item?.message);
                    }
                    if (selectedIndex === 1) {
                        Alert.alert(
                            'Thank you for reporting. Our team will take a look 🙂'
                        );
                    }
                }
            );
        },
        [showActionSheetWithOptions]
    );
    const renderMessageItem = ({
        item,
        index
    }: ListRenderItemInfo<MessageItemProps>): JSX.Element => (
        <MessageListItem
            item={item}
            onLongPress={() => showActionSheet(item)}
            hasSpace={messages[index]?.sender !== messages[index + 1]?.sender}
        />
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
