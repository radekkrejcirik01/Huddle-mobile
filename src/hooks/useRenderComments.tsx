import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { CommentItemInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { HuddleCommentsListItem } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleLikeCommentPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';

export const useRenderComments = (
    huddleId: number,
    refreshComments: () => void,
    onRefresh: () => void
): {
    renderCommentItem: ({
        item
    }: ListRenderItemInfo<CommentItemInterface>) => JSX.Element;
    keyCommentExtractor: (item: CommentItemInterface) => string;
    refreshControl: JSX.Element;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openProfilePhoto = useOpenProfilePhoto();
    const [refreshing, setRefreshing] = useState(false);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            onRefresh();
        }, 1000);
    }, [onRefresh]);

    const pressCommentLike = useCallback(
        (value: boolean, item: CommentItemInterface) => {
            if (value) {
                postRequestUser<
                    ResponseInterface,
                    HuddleLikeCommentPostInterface
                >('huddle/comment/like', {
                    sender: username,
                    receiver: item?.sender,
                    commentId: item?.id,
                    huddleId
                }).subscribe(() => {
                    refreshComments();
                });
            } else {
                deleteRequestUser<ResponseInterface>(
                    `huddle/comment/like/${item?.id}/${username}`
                ).subscribe(() => {
                    refreshComments();
                });
            }
        },
        [huddleId, refreshComments, username]
    );

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
                likeValue={item?.liked}
                onPressLike={(value: boolean) => pressCommentLike(value, item)}
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
