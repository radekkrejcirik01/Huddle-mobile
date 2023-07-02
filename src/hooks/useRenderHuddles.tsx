import React, { useCallback, useMemo, useRef } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@hooks/useNavigation';
import { useRefresh } from '@hooks/useRefresh';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import {
    HuddleInteractPostInterface,
    MuteHuddlesPostInterface
} from '@interfaces/post/Post.inteface';
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';
import { SmallHuddleListItem } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem';
import { ReducerProps } from '@store/index/index.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useRenderHuddles = (
    huddles?: Array<HuddleItemInterface>,
    loadHuddles?: (lastId?: number) => void
): {
    renderLargeItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    renderSmallItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    keyExtractor: (item: HuddleItemInterface, index: number) => string;
    refreshControl: JSX.Element;
    onPressInteract: (item: HuddleItemInterface) => void;
    onEndReachedLargeItem: () => void;
    onScrollBeginDrag: () => void;
    onEndReachedSmallItem: () => void;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { showActionSheetWithOptions } = useActionSheet();
    const { refreshing, onRefresh } = useRefresh(loadHuddles);
    const openProfilePhoto = useOpenProfilePhoto();

    const scrollBeginDragged = useRef<boolean>(false);

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
                    receiver: createdBy
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status && loadHuddles) {
                    loadHuddles();
                }
            });
        },
        [loadHuddles]
    );

    const removeInteraction = useCallback(
        (huddleId: number) => {
            deleteRequestUser<ResponseInterface>(
                `interaction/${huddleId}`
            ).subscribe((response: ResponseInterface) => {
                if (response?.status && loadHuddles) {
                    loadHuddles();
                }
            });
        },
        [loadHuddles]
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

    const muteHuddles = useCallback(
        (mute: string) => {
            postRequestUser<ResponseInterface, MuteHuddlesPostInterface>(
                'mute-huddles',
                {
                    muted: mute
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) loadHuddles();
            });
        },
        [loadHuddles]
    );

    const itemLongPress = useCallback(
        (item: HuddleItemInterface) => {
            const options = ['Report', `Mute`, 'Cancel'];

            showActionSheetWithOptions(
                {
                    options,
                    title: `${item.name}'s Huddles`,
                    cancelButtonIndex: 2,
                    userInterfaceStyle: 'dark'
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        Alert.alert(
                            'Thank you for reporting, our team will take a look 🧡'
                        );
                    }
                    if (selectedIndex === 1) {
                        muteHuddles(item.createdBy);
                    }
                }
            );
        },
        [muteHuddles, showActionSheetWithOptions]
    );

    const renderLargeItem = useCallback(
        ({ item }: ListRenderItemInfo<HuddleItemInterface>): JSX.Element => (
            <LargeHuddleListItem
                item={item}
                created={item?.createdBy === username}
                onPressCard={() => openHuddle(item)}
                onPressProfilePhoto={() =>
                    openProfilePhoto(item.name, item?.profilePhoto)
                }
                onItemLongPress={() => itemLongPress(item)}
                onPressInteract={() => onPressInteract(item)}
            />
        ),
        [itemLongPress, onPressInteract, openHuddle, openProfilePhoto, username]
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

    const onEndReachedLargeItem = useCallback(() => {
        if (huddles?.length >= 10) {
            loadHuddles(huddles[huddles?.length - 1].id);
        }
    }, [huddles, loadHuddles]);

    const onScrollBeginDrag = useCallback(() => {
        scrollBeginDragged.current = true;
    }, []);

    const onEndReachedSmallItem = useCallback(() => {
        if (huddles?.length && scrollBeginDragged.current) {
            loadHuddles(huddles[huddles?.length - 1].id);
        }
    }, [huddles, loadHuddles]);

    return {
        renderLargeItem,
        renderSmallItem,
        keyExtractor,
        refreshControl,
        onPressInteract,
        onEndReachedLargeItem,
        onScrollBeginDrag,
        onEndReachedSmallItem
    };
};
