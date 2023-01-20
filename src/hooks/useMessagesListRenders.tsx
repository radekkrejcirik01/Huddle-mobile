import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { MessagesItem } from '@components/messages/MessagesItem/MessagesItem';
import { MessagesListDataProps } from '@screens/account/MessagesScreen/MessagesScreen.props';

export const useMessagesListRenders = (
    data: Array<MessagesListDataProps>,
    onItemPress: (item: MessagesListDataProps) => void,
    onRefresh: () => void
): {
    getItemType: (item: MessagesListDataProps) => MessagesListDataProps;
    renderItem: ({
        item
    }: ListRenderItemInfo<MessagesListDataProps>) => JSX.Element;
    keyExtractor: (item: MessagesListDataProps, index: number) => string;
    refreshControl: JSX.Element;
} => {
    const [refreshing, setRefreshing] = useState(false);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            onRefresh();
        }, 1000);
    }, [onRefresh]);

    const getItemType = (item: MessagesListDataProps): MessagesListDataProps =>
        item;

    const renderItem = ({
        item
    }: ListRenderItemInfo<MessagesListDataProps>): JSX.Element => (
        <MessagesItem key={item.id} item={item} onPress={onItemPress} />
    );

    const keyExtractor = (item: MessagesListDataProps): string =>
        item.id.toString();

    const refreshControl = (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="white"
        />
    );

    return { getItemType, renderItem, keyExtractor, refreshControl };
};
