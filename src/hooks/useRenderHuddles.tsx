import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleInteractPostInterface } from '@interfaces/post/Post.inteface';
import { HuddlesListItem } from '@components/huddles/HuddlesListItem/HuddlesListItem';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useRenderHuddles = (
    data: Array<HuddleItemInterface>,
    onRefresh: () => void
): {
    renderItem: ({
        item
    }: ListRenderItemInfo<HuddleItemInterface>) => JSX.Element;
    keyExtractor: (item: HuddleItemInterface, index: number) => string;
    refreshControl: JSX.Element;
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

    const onPressCard = useCallback(() => {}, []);

    const onPressProfilePhoto = useCallback(
        (item: HuddleItemInterface) => {
            navigateTo(AccountStackNavigatorEnum.PersonProfileScreen, {
                username: item.createdBy,
                name: item.name,
                profilePhoto: item.profilePhoto
            });
        },
        [navigateTo]
    );

    const interact = useCallback(
        (huddleId: number) => {
            postRequestUser<ResponseInterface, HuddleInteractPostInterface>(
                'huddle/interaction',
                {
                    username,
                    huddleId
                }
            ).subscribe();
        },
        [username]
    );

    const removeInteraction = useCallback(
        (huddleId: number) => {
            deleteRequestUser<ResponseInterface>(
                `huddle/interaction/${username}/${huddleId}`
            ).subscribe();
        },
        [username]
    );

    const onInteract = useCallback(
        (item: HuddleItemInterface) => {
            if (item.interacted) {
                removeInteraction(item.id);
            } else {
                interact(item.id);
            }
        },
        [interact, removeInteraction]
    );

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<HuddleItemInterface>): JSX.Element => (
            <HuddlesListItem
                item={item}
                onPressCard={onPressCard}
                onPressProfilePhoto={onPressProfilePhoto}
                onInteract={onInteract}
            />
        ),
        [onInteract, onPressCard, onPressProfilePhoto]
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

    return { renderItem, keyExtractor, refreshControl };
};
