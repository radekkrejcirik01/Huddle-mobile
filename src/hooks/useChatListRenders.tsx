import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { ChatDataProps } from '@components/chat/ChatList/ChatList.props';
import { ChatItem } from '@components/chat/ChatItem/ChatItem';

export const useChatListRenders = (
    data: Array<ChatDataProps>
): {
    getItem: (listData: Array<ChatDataProps>, index: number) => ChatDataProps;
    renderItem: ({ item }: ListRenderItemInfo<ChatDataProps>) => JSX.Element;
    getItemCount: () => number;
    keyExtractor: (item: ChatDataProps, index: number) => string;
} => {
    const getItem = (
        listData: Array<ChatDataProps>,
        index: number
    ): ChatDataProps => listData[index];

    const renderItem = ({
        item
    }: ListRenderItemInfo<ChatDataProps>): JSX.Element => (
        <ChatItem item={item} />
    );

    const getItemCount = useCallback((): number => data?.length, [data]);

    const keyExtractor = (item: ChatDataProps): string => item?.id?.toString();

    return { getItem, renderItem, getItemCount, keyExtractor };
};
