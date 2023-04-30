import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
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

    const openProfile = useCallback(
        (item: HuddleItemInterface) => {
            navigateTo(AccountStackNavigatorEnum.PersonProfileScreen, {
                username: item.createdBy,
                name: item.name,
                profilePhoto: item.profilePhoto
            });
        },
        [navigateTo]
    );

    const onPressProfilePhoto = useCallback(
        (item: HuddleItemInterface) => openProfile(item),
        [openProfile]
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
            ).subscribe(() => {
                if (onRefresh) {
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
            ).subscribe(() => {
                if (onRefresh) {
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
                onPressCard={openHuddle}
                onPressProfilePhoto={onPressProfilePhoto}
                onPressInteract={onPressInteract}
            />
        ),
        [onPressInteract, onPressProfilePhoto, openHuddle]
    );

    const renderSmallItem = useCallback(
        ({ item }: ListRenderItemInfo<HuddleItemInterface>): JSX.Element => (
            <SmallHuddleListItem item={item} onPressCard={openHuddle} />
        ),
        [openHuddle]
    );
    const keyExtractor = (item: HuddleItemInterface): string =>
        item?.id?.toString();

    const refreshControl = (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="white"
        />
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
