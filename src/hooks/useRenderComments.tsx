import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { CommentItemInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { HuddleCommentsListItem } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';

export const useRenderComments = (
    refreshComments: () => void,
    onRefresh: () => void
): {
    renderCommentItem: ({
        item
    }: ListRenderItemInfo<CommentItemInterface>) => JSX.Element;
    keyCommentExtractor: (item: CommentItemInterface) => string;
    refreshControl: JSX.Element;
} => {
    const openProfilePhoto = useOpenProfilePhoto();
    const [refreshing, setRefreshing] = useState(false);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            onRefresh();
        }, 1000);
    }, [onRefresh]);

    const pressCommentLike = useCallback((item: CommentItemInterface) => {},
    []);

    const renderCommentItem = useCallback(
        ({ item }: ListRenderItemInfo<CommentItemInterface>): JSX.Element => (
            <HuddleCommentsListItem
                item={item}
                onPressProfilePhoto={() =>
                    openProfilePhoto(item.name, item?.profilePhoto)
                }
                onPressName={() =>
                    openProfilePhoto(item.name, item?.profilePhoto)
                }
                onPressMention={() =>
                    openProfilePhoto(
                        item?.mention.name,
                        item?.mention?.profilePhoto
                    )
                }
                onPressLike={() => pressCommentLike(item)}
            />
        ),
        [openProfilePhoto, pressCommentLike]
    );

    const keyCommentExtractor = (item: CommentItemInterface): string =>
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

    return { renderCommentItem, keyCommentExtractor, refreshControl };
};
