import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { HuddlesScreenStyle } from '@screens/account/HuddlesScreen/HuddlesScreen.style';
import { HuddlesTabHeader } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { HuddlesListItem } from '@components/huddles/HuddlesListItem/HuddlesListItem';
import { useRefresh } from '@hooks/useRefresh';
import {
    deleteRequestUser,
    getRequestUser,
    postRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { HuddleInteractPostInterface } from '@interfaces/post/Post.inteface';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const HuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);

    const loadHuddles = useCallback(() => {
        getRequestUser<ResponseHuddlesGetInterface>(
            `huddles/${username}`
        ).subscribe((response: ResponseHuddlesGetInterface) => {
            if (response?.status) {
                setHuddles(response?.data);
            }
        });
    }, [username]);

    const { refreshing, onRefresh } = useRefresh(loadHuddles);

    useEffect(() => loadHuddles(), [loadHuddles]);

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

    return (
        <View style={HuddlesScreenStyle.container}>
            <HuddlesTabHeader />
            <FlashList
                data={huddles}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="white"
                    />
                }
                renderItem={renderItem}
                keyExtractor={(item: HuddleItemInterface) =>
                    item?.id?.toString()
                }
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={HuddlesScreenStyle.listContentContainer}
            />
        </View>
    );
};
