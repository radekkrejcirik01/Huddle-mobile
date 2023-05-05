import React, { useCallback, useMemo, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleInteractPostInterface } from '@interfaces/post/Post.inteface';
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';
import { SmallHuddleListItem } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

export const useRenderHuddles = (
    onRefresh?: () => void
): {
    renderLargeItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    renderSmallItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    keyExtractor: (item: HuddleItemInterface, index: number) => string;
    refreshControl: JSX.Element;
    openHuddleFromNotification: (item: NotificationsListProps) => void;
    onPressInteract: (item: HuddleItemInterface) => void;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [refreshing, setRefreshing] = useState(false);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            onRefresh();
        }, 1000);
    }, [onRefresh]);

    const openHuddleFromNotification = (item: NotificationsListProps) => {};

    const openHuddle = useCallback(
        (item: HuddleItemInterface) => {
            navigateTo(AccountStackNavigatorEnum.HuddleScreen, {
                huddle: item
            });
        },
        [navigateTo]
    );

    const interact = useCallback(
        (huddleId: number, createdBy: string) => {
            postRequestUser<ResponseInterface, HuddleInteractPostInterface>(
                'huddle/interaction',
                {
                    huddleId,
                    sender: username,
                    receiver: createdBy
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status && onRefresh) {
                    onRefresh();
                }
            });
        },
        [onRefresh, username]
    );

    const removeInteraction = useCallback(
        (huddleId: number) => {
            deleteRequestUser<ResponseInterface>(
                `huddle/interaction/${username}/${huddleId}`
            ).subscribe((response: ResponseInterface) => {
                if (response?.status && onRefresh) {
                    onRefresh();
                }
            });
        },
        [onRefresh, username]
    );

    const onPressInteract = useCallback(
        (item: HuddleItemInterface) => {
            if (!item?.interacted) {
                interact(item.id, item.createdBy);
            } else {
                removeInteraction(item.id);
            }
        },
        [interact, removeInteraction]
    );

    const renderLargeItem = useCallback(
        ({ item }: ListRenderItemInfo<HuddleItemInterface>): JSX.Element => (
            <LargeHuddleListItem
                item={item}
                created={item?.createdBy === username}
                onPressCard={() => openHuddle(item)}
                onPressProfilePhoto={() => Alert.alert('open chat')}
                onPressInteract={() => onPressInteract(item)}
            />
        ),
        [onPressInteract, openHuddle, username]
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
                onRefresh={refresh}
                tintColor="white"
            />
        ),
        [refresh, refreshing]
    );

    return {
        renderLargeItem,
        renderSmallItem,
        keyExtractor,
        refreshControl,
        openHuddleFromNotification,
        onPressInteract
    };
};
