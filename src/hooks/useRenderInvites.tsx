import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useRefresh } from '@hooks/useRefresh';
import { InviteItemProps } from '@screens/account/InvitesScreen/InvitesScreen.props';
import { InviteListItem } from '@components/friends/InviteListItem/InviteListItem';
import { putRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AcceptPersonInviteInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';

export const useRenderInvites = (
    loadInvites: () => void
): {
    renderInvitesItem: ({
        item
    }: ListRenderItemInfo<InviteItemProps>) => JSX.Element;
    keyInviteExtractor: (item: InviteItemProps) => string;
    refreshControl: JSX.Element;
} => {
    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const openProfile = useOpenProfilePhoto();
    const { refreshing, onRefresh } = useRefresh(loadInvites);

    const acceptPersonInvite = useCallback(
        (invite: InviteItemProps) => {
            putRequestUser<ResponseInterface, AcceptPersonInviteInterface>(
                '/person',
                {
                    id: invite.id,
                    sender: user,
                    receiver: invite.user.username
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadInvites();
                }
            });
        },
        [loadInvites, user]
    );

    const renderInvitesItem = useCallback(
        ({ item }: ListRenderItemInfo<InviteItemProps>): JSX.Element => (
            <InviteListItem
                item={item}
                onAccept={() => acceptPersonInvite(item)}
                onOpenProfile={() =>
                    openProfile(item.user.username, item.user?.profilePhoto)
                }
            />
        ),
        [acceptPersonInvite, openProfile]
    );

    const keyInviteExtractor = (item: InviteItemProps): string =>
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

    return { renderInvitesItem, keyInviteExtractor, refreshControl };
};
