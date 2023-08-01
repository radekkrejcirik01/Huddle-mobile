import React, { useCallback, useMemo, useRef } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { useRefresh } from '@hooks/useRefresh';
import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { SmallHuddleListItem } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useRenderHuddles = (
    huddles?: Array<HuddleItemInterface>,
    loadHuddles?: (lastId?: number) => void
): {
    renderSmallItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    keyExtractor: (item: HuddleItemInterface, index: number) => string;
    refreshControl: JSX.Element;
    onScrollBeginDrag: () => void;
    onEndReachedSmallItem: () => void;
} => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { refreshing, onRefresh } = useRefresh(loadHuddles);

    const scrollBeginDragged = useRef<boolean>(false);

    const openHuddle = useCallback(
        (item: HuddleItemInterface) => {
            navigateTo(AccountStackNavigatorEnum.HuddleScreen, {
                huddle: item
            });
        },
        [navigateTo]
    );

    const renderSmallItem = useCallback(
        ({ item }: ListRenderItemInfo<HuddleItemInterface>): JSX.Element => (
            <SmallHuddleListItem item={item} onPressCard={openHuddle} />
        ),
        [openHuddle]
    );
    const keyExtractor = (item: HuddleItemInterface): string =>
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

    const onScrollBeginDrag = useCallback(() => {
        scrollBeginDragged.current = true;
    }, []);

    const onEndReachedSmallItem = useCallback(() => {
        if (huddles?.length && scrollBeginDragged.current) {
            loadHuddles(huddles[huddles?.length - 1].id);
        }
    }, [huddles, loadHuddles]);

    return {
        renderSmallItem,
        keyExtractor,
        refreshControl,
        onScrollBeginDrag,
        onEndReachedSmallItem
    };
};
