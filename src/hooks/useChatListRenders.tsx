import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { ConversationDataProps } from '@components/conversation/ConversationList/ConversationList.props';
import { ConversationItem } from '@components/conversation/ConversationItem/ConversationItem';

export const useChatListRenders = (
    data: Array<ConversationDataProps>
): {
    getItem: (
        listData: Array<ConversationDataProps>,
        index: number
    ) => ConversationDataProps;
    renderItem: ({
        item
    }: ListRenderItemInfo<ConversationDataProps>) => JSX.Element;
    getItemCount: () => number;
    keyExtractor: (item: ConversationDataProps, index: number) => string;
} => {
    const getItem = (
        listData: Array<ConversationDataProps>,
        index: number
    ): ConversationDataProps => listData[index];

    const renderItem = ({
        item
    }: ListRenderItemInfo<ConversationDataProps>): JSX.Element => (
        <ConversationItem item={item} />
    );

    const getItemCount = useCallback((): number => data?.length, [data]);

    const keyExtractor = (item: ConversationDataProps): string =>
        item?.id?.toString();

    return { getItem, renderItem, getItemCount, keyExtractor };
};
