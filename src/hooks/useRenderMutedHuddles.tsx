import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useRefresh } from '@hooks/useRefresh';
import { MutedHuddlesItemProps } from '@screens/account/MutedHuddlesScreen/MutedHuddlesScreen.props';
import { MuteHuddlesListItem } from '@components/settings/MuteHuddlesListItem/MuteHuddlesListItem';
import { deleteRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ReducerProps } from '@store/index/index.props';

export const useRenderMutedHuddles = (
    loadMutedHuddles: () => void
): {
    renderMutedHuddlesItem: ({
        item
    }: ListRenderItemInfo<MutedHuddlesItemProps>) => JSX.Element;
    keyMutedHuddlesExtractor: (item: MutedHuddlesItemProps) => string;
    refreshControl: JSX.Element;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { refreshing, onRefresh } = useRefresh(loadMutedHuddles);
    const { showActionSheetWithOptions } = useActionSheet();

    const unmute = useCallback(
        (user: string) => {
            const options = ['Unmute', 'Cancel'];

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 1,
                    userInterfaceStyle: 'dark'
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        deleteRequestUser<ResponseInterface>(
                            `muted-huddles/${username}/${user}`
                        ).subscribe((response: ResponseInterface) => {
                            if (response?.status) {
                                loadMutedHuddles();
                            }
                        });
                    }
                }
            );
        },
        [loadMutedHuddles, showActionSheetWithOptions, username]
    );

    const renderMutedHuddlesItem = useCallback(
        ({ item }: ListRenderItemInfo<MutedHuddlesItemProps>): JSX.Element => (
            <MuteHuddlesListItem
                item={item}
                onPresUnmute={() => unmute(item.username)}
            />
        ),
        [unmute]
    );

    const keyMutedHuddlesExtractor = (item: MutedHuddlesItemProps): string =>
        item?.username?.toString();

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

    return {
        renderMutedHuddlesItem,
        keyMutedHuddlesExtractor,
        refreshControl
    };
};
