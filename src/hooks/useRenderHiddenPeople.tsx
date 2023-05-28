import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useRefresh } from '@hooks/useRefresh';
import { HiddenItemProps } from '@screens/account/ShowHuddlesScreen/ShowHuddlesScreen.props';
import { ShowHuddleItem } from '@components/huddles/ShowHuddleItem/ShowHuddleItem';

export const useRenderHiddenPeople = (
    hiddenPeople: Array<HiddenItemProps>,
    loadHiddenPeople: (lastId?: number) => void,
    onItemPress: (user: string) => void
): {
    renderHiddenPeopleItem: ({
        item
    }: ListRenderItemInfo<HiddenItemProps>) => JSX.Element;
    keyHiddenPeopleExtractor: (item: HiddenItemProps) => string;
    refreshControl: JSX.Element;
    onEndReached: () => void;
} => {
    const { refreshing, onRefresh } = useRefresh(loadHiddenPeople);

    const renderHiddenPeopleItem = useCallback(
        ({ item }: ListRenderItemInfo<HiddenItemProps>): JSX.Element => (
            <ShowHuddleItem
                item={item}
                onItemPress={() => onItemPress(item.user.username)}
            />
        ),
        [onItemPress]
    );

    const keyHiddenPeopleExtractor = (item: HiddenItemProps): string =>
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
        if (hiddenPeople?.length >= 20) {
            loadHiddenPeople(hiddenPeople[hiddenPeople?.length - 1].id);
        }
    }, [hiddenPeople, loadHiddenPeople]);

    return {
        renderHiddenPeopleItem,
        keyHiddenPeopleExtractor,
        refreshControl,
        onEndReached
    };
};
