import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, RefreshControl } from 'react-native';
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
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';
import { SmallHuddleListItem } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

export const useRenderHuddles = (
    data: Array<HuddleItemInterface>,
    onRefresh: () => void
): {
    renderLargeItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    renderSmallItem: ({
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

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

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

    const hideHuddle = useCallback(() => {
        // When modal is closed while editing
        if (isKeyboardVisible) {
            Keyboard.dismiss();
        }
        setHuddleOpened(false);
    }, [isKeyboardVisible]);

    return {
        renderLargeItem,
        renderSmallItem,
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
