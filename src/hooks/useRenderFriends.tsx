import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useOpenChat } from '@hooks/useOpenChat';
import { useRefresh } from '@hooks/useRefresh';
import { FriendsItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import { FriendsListItem } from '@components/friends/FriendsListItem/FriendsListItem';

export const useRenderFriends = (
    friends: Array<FriendsItemProps>,
    loadFriends: (lastId?: number) => void
): {
    renderFriendsItem: ({
        item
    }: ListRenderItemInfo<FriendsItemProps>) => JSX.Element;
    keyFriendsExtractor: (item: FriendsItemProps) => string;
    refreshControl: JSX.Element;
    onEndReached: () => void;
} => {
    const openProfilePhoto = useOpenProfilePhoto();
    const openChat = useOpenChat();
    const { refreshing, onRefresh } = useRefresh(loadFriends);

    const onItemPress = useCallback(
        (item: FriendsItemProps) => {
            openChat(item.name, item?.profilePhoto, item?.username);
        },
        [openChat]
    );

    const renderFriendsItem = useCallback(
        ({ item }: ListRenderItemInfo<FriendsItemProps>): JSX.Element => (
            <FriendsListItem
                item={item}
                onItemPress={() => onItemPress(item)}
                onPhotoPress={() =>
                    openProfilePhoto(item.name, item?.profilePhoto)
                }
            />
        ),
        [onItemPress, openProfilePhoto]
    );

    const keyFriendsExtractor = (item: FriendsItemProps): string =>
        item?.id?.toString();

    const refreshControl = useMemo(
        (): JSX.Element => (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="white"
            />
        ),
        [onRefresh, refreshing]
    );

    const onEndReached = useCallback(() => {
        if (friends?.length >= 20) {
            loadFriends(friends[friends?.length - 1].id);
        }
    }, [friends, loadFriends]);

    return {
        renderFriendsItem,
        keyFriendsExtractor,
        refreshControl,
        onEndReached
    };
};
