import React from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { MessageListItem } from '@components/conversation/MessagesLisItem/MessageListItem';
import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export const useRenderMesages = (): {
    renderMessageItem: ({
        item
    }: ListRenderItemInfo<MessageItemProps>) => JSX.Element;
    keyMessageExtractor: (item: MessageItemProps, index: number) => string;
} => {
    const renderMessageItem = ({
        item
    }: ListRenderItemInfo<MessageItemProps>): JSX.Element => (
        <MessageListItem item={item} />
    );

    const keyMessageExtractor = (item: MessageItemProps): string =>
        item?.id?.toString();

    return { renderMessageItem, keyMessageExtractor };
};
