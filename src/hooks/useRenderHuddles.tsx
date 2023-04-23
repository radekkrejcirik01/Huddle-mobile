import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import {
    deleteRequestUser,
    getRequestUser,
    postRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseHuddleGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { HuddleInteractPostInterface } from '@interfaces/post/Post.inteface';
import { HuddlesListItem } from '@components/huddles/HuddlesListItem/HuddlesListItem';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

export const useRenderHuddles = (
    data: Array<HuddleItemInterface>,
    onRefresh: () => void
): {
    renderItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    keyExtractor: (item: HuddleItemInterface, index: number) => string;
    refreshControl: JSX.Element;
    huddleOpened: boolean;
    huddleItem: HuddleItemInterface;
    openHuddleFromNotification: (item: NotificationsListProps) => void;
    onPressProfilePhoto: (item: HuddleItemInterface) => void;
    onPressInteract: (item: HuddleItemInterface) => void;
    hideHuddle: () => void;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [refreshing, setRefreshing] = useState(false);
    const [huddleOpened, setHuddleOpened] = useState(false);
    const [huddleItem, setHuddleItem] = useState<HuddleItemInterface>();

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            onRefresh();
        }, 1000);
    }, [onRefresh]);

    const openHuddleFromNotification = (item: NotificationsListProps) => {
        setHuddleOpened(true);
        getRequestUser<ResponseHuddleGetInterface>(
            `huddle/${item?.huddleId}`
        ).subscribe((response: ResponseHuddleGetInterface) => {
            if (response?.status) {
                setHuddleItem(response?.data);
            }
        });
    };

    const openHuddle = useCallback((item: HuddleItemInterface) => {
        setHuddleItem(item);
        setHuddleOpened(true);
    }, []);

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
        (item: HuddleItemInterface) => {
            if (huddleOpened) {
                setHuddleOpened(false);
                setTimeout(() => {
                    openProfile(item);
                }, 300);
            } else {
                openProfile(item);
            }
        },
        [huddleOpened, openProfile]
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
                onRefresh();
            });
        },
        [onRefresh, username]
    );

    const removeInteraction = useCallback(
        (huddleId: number) => {
            deleteRequestUser<ResponseInterface>(
                `huddle/interaction/${username}/${huddleId}`
            ).subscribe(() => {
                onRefresh();
            });
        },
        [onRefresh, username]
    );

    const onPressInteract = useCallback(
        (item: HuddleItemInterface) => {
            if (item.interacted) {
                removeInteraction(item.id);
            } else {
                interact(item.id, item.createdBy);
            }
        },
        [interact, removeInteraction]
    );

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<HuddleItemInterface>): JSX.Element => (
            <HuddlesListItem
                item={item}
                onPressCard={openHuddle}
                onPressProfilePhoto={onPressProfilePhoto}
                onPressInteract={onPressInteract}
            />
        ),
        [onPressInteract, onPressProfilePhoto, openHuddle]
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

    const hideHuddle = () => setHuddleOpened(false);

    return {
        renderItem,
        keyExtractor,
        refreshControl,
        huddleOpened,
        huddleItem,
        openHuddleFromNotification,
        onPressProfilePhoto,
        onPressInteract,
        hideHuddle
    };
};
