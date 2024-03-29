import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useRefresh } from '@hooks/useRefresh';
import { CommentItemInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { HuddleCommentsListItem } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleLikeCommentPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';

export const useRenderComments = (
    comments: Array<CommentItemInterface>,
    huddleId: number,
    refreshComments: () => void,
    loadComments: (lastId?: number) => void,
    mention: (value: Mention) => void
): {
    renderCommentItem: ({
        item
    }: ListRenderItemInfo<CommentItemInterface>) => JSX.Element;
    keyCommentExtractor: (item: CommentItemInterface) => string;
    refreshControl: JSX.Element;
    onEndReached: () => void;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openProfilePhoto = useOpenProfilePhoto();
    const { refreshing, onRefresh } = useRefresh(loadComments);
    const { showActionSheetWithOptions } = useActionSheet();

    const pressCommentLike = useCallback(
        (value: boolean, item: CommentItemInterface) => {
            if (value) {
                postRequestUser<
                    ResponseInterface,
                    HuddleLikeCommentPostInterface
                >('comment-like', {
                    receiver: item?.sender,
                    commentId: item?.id,
                    huddleId
                }).subscribe(() => {
                    refreshComments();
                });
            } else {
                deleteRequestUser<ResponseInterface>(
                    `comment-like/${item?.id}`
                ).subscribe(() => {
                    refreshComments();
                });
            }
        },
        [huddleId, refreshComments]
    );

    const deleteComment = useCallback(
        (id: number) => {
            deleteRequestUser<ResponseInterface>(`comment/${id}`).subscribe(
                () => {
                    refreshComments();
                }
            );
        },
        [refreshComments]
    );

    const itemLongPress = useCallback(
        (item: CommentItemInterface) => {
            const commentByUser = item.sender === username;
            const options = [
                'Copy',
                !commentByUser && 'Reply',
                commentByUser && 'Delete',
                'Cancel'
            ].filter(Boolean);

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 2,
                    ...(commentByUser && {
                        destructiveButtonIndex: 1
                    }),
                    userInterfaceStyle: 'dark'
                },
                (selectedIndex: number) => {
                    if (options[selectedIndex] === 'Reply') {
                        mention({
                            username: item?.sender,
                            name: item?.name,
                            profilePhoto: item?.profilePhoto
                        });
                    }
                    if (options[selectedIndex] === 'Delete') {
                        deleteComment(item.id);
                    }
                    if (options[selectedIndex] === 'Copy') {
                        Clipboard.setString(item?.message);
                    }
                }
            );
        },
        [deleteComment, mention, showActionSheetWithOptions, username]
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
                onItemLongPress={() => itemLongPress(item)}
                liked={item?.liked}
                onPressLike={(value: boolean) => pressCommentLike(value, item)}
            />
        ),
        [itemLongPress, openProfilePhoto, pressCommentLike]
    );

    const keyCommentExtractor = (item: CommentItemInterface): string =>
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

    const onEndReached = useCallback(() => {
        if (comments?.length >= 15) {
            loadComments(comments[comments?.length - 1].id);
        }
    }, [comments, loadComments]);

    return {
        renderCommentItem,
        keyCommentExtractor,
        refreshControl,
        onEndReached
    };
};
