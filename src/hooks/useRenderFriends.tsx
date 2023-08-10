import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useOpenChat } from '@hooks/useOpenChat';
import { useRefresh } from '@hooks/useRefresh';
import { FriendsItemProps } from '@screens/account/ContactsScreen/ContactsScreen.props';
import { ContactItem } from '@components/contacts/ContactItem/ContactItem';
import { putRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AcceptPersonInviteInterface } from '@interfaces/post/Post.inteface';

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
            openChat(
                item.user.name,
                item.user?.profilePhoto,
                item.user?.username
            );
        },
        [openChat]
    );

    const acceptInvites = useCallback(
        (id: number, username: string) => {
            putRequestUser<ResponseInterface, AcceptPersonInviteInterface>(
                '/person',
                {
                    id,
                    receiver: username
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadFriends();
                }
            });
        },
        [loadFriends]
    );

    const renderFriendsItem = useCallback(
        ({ item }: ListRenderItemInfo<FriendsItemProps>): JSX.Element => (
            <ContactItem
                item={item}
                onItemPress={() => onItemPress(item)}
                onPhotoPress={() =>
                    openProfilePhoto(item.user.name, item.user?.profilePhoto)
                }
                onAcceptPress={() => acceptInvites(item.id, item.user.username)}
            />
        ),
        [acceptInvites, onItemPress, openProfilePhoto]
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
