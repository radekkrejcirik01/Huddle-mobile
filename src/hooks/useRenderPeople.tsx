import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useOpenChat } from '@hooks/useOpenChat';
import { useRefresh } from '@hooks/useRefresh';
import { PeopleItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { PeopleListItem } from '@components/people/PeopleListItem/PeopleListItem';

export const useRenderPeople = (
    people: Array<PeopleItemProps>,
    loadPeople: (lastId?: number) => void
): {
    renderPeopleItem: ({
        item
    }: ListRenderItemInfo<PeopleItemProps>) => JSX.Element;
    keyPeopleExtractor: (item: PeopleItemProps) => string;
    refreshControl: JSX.Element;
    onEndReached: () => void;
} => {
    const openProfilePhoto = useOpenProfilePhoto();
    const openChat = useOpenChat();
    const { refreshing, onRefresh } = useRefresh(loadPeople);

    const onItemPress = useCallback(
        (item: PeopleItemProps) => {
            openChat(item.name, item?.profilePhoto, item?.username);
        },
        [openChat]
    );

    const renderPeopleItem = useCallback(
        ({ item }: ListRenderItemInfo<PeopleItemProps>): JSX.Element => (
            <PeopleListItem
                item={item}
                onItemPress={() => onItemPress(item)}
                onPhotoPress={() =>
                    openProfilePhoto(item.name, item?.profilePhoto)
                }
            />
        ),
        [onItemPress, openProfilePhoto]
    );

    const keyPeopleExtractor = (item: PeopleItemProps): string =>
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
        if (people?.length >= 20) {
            loadPeople(people[people?.length - 1].id);
        }
    }, [loadPeople, people]);

    return {
        renderPeopleItem,
        keyPeopleExtractor,
        refreshControl,
        onEndReached
    };
};
