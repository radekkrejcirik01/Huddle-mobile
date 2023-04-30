import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';
import { HuddleInteractionsListItem } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleConfirmPostInterface } from '@interfaces/post/Post.inteface';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export const useRenderInteractions = (
    huddle: HuddleItemInterface,
    isConfirmed: boolean,
    onRefresh: () => void
): {
    renderItem: ({
        item
    }: ListRenderItemInfo<HuddleInteractionInterface>) => JSX.Element;
    keyExtractor: (item: HuddleInteractionInterface) => string;
    refreshControl: JSX.Element;
} => {
    const [refreshing, setRefreshing] = useState(false);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            onRefresh();
        }, 1000);
    }, [onRefresh]);

    const confirm = useCallback(
        (username: string) => {
            postRequestUser<ResponseInterface, HuddleConfirmPostInterface>(
                'huddle/confirm',
                {
                    huddleId: huddle?.id,
                    sender: huddle?.createdBy,
                    receiver: username
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    onRefresh();
                }
            });
        },
        [huddle?.createdBy, huddle?.id, onRefresh]
    );

    const renderItem = useCallback(
        ({
            item
        }: ListRenderItemInfo<HuddleInteractionInterface>): JSX.Element => (
            <HuddleInteractionsListItem
                item={item}
                isConfirmed={isConfirmed}
                onConfirm={confirm}
            />
        ),
        [confirm, isConfirmed]
    );

    const keyExtractor = (item: HuddleInteractionInterface): string =>
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
