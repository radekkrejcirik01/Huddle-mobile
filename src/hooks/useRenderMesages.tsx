import React, { useCallback } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
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
    const renderMessageItem = ({
        item
    }: ListRenderItemInfo<MessageItemProps>): JSX.Element => (
        <MessageListItem item={item} />
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
