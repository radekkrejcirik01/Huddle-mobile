import React, { useCallback, useMemo } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { useRefresh } from '@hooks/useRefresh';
import { CommentItemInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { HuddleCommentsListItem } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleLikeCommentPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';

export const useRenderComments = (
    huddleId: number,
    refreshComments: () => void,
    loadComments: () => void,
    mention: (value: Mention) => void
): {
    renderCommentItem: ({
        item
    }: ListRenderItemInfo<CommentItemInterface>) => JSX.Element;
    keyCommentExtractor: (item: CommentItemInterface) => string;
    refreshControl: JSX.Element;
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

    const itemLongPress = useCallback(
        (item: CommentItemInterface) => {
            const options = ['Report', 'Copy', 'Reply', 'Cancel'];

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 3,
                    userInterfaceStyle: 'dark'
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        Alert.alert(
                            'Thank you for reporting, our team will take a look 🧡'
                        );
                    }
                    if (selectedIndex === 1) {
                        Clipboard.setString(item?.message);
                    }
                    if (selectedIndex === 2) {
                        mention({
                            username: item?.sender,
                            name: item?.name,
                            profilePhoto: item?.profilePhoto
                        });
                    }
                }
            );
        },
        [mention, showActionSheetWithOptions]
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
                likeValue={item?.liked}
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

    return { renderCommentItem, keyCommentExtractor, refreshControl };
};
