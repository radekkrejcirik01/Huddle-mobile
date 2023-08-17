import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { CommentLikesModalProps } from '@components/huddles/CommentLikesModal/CommentLikesModal.props';
import { CommentLikeInterface } from '@components/huddles/CommentItem/CommentItem.props';
import { LikeItem } from '@components/huddles/LikeItem/LikeItem';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddleCommentLikesGetInterface } from '@interfaces/response/Response.interface';
import { CommentLikesModalStyle } from '@components/huddles/CommentLikesModal/CommentLikesModal.style';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const CommentLikesModal = ({
    id,
    hideModal
}: CommentLikesModalProps): JSX.Element => {
    const openProfile = useOpenProfilePhoto();
    const { bottom } = useSafeAreaInsets();

    const [likes, setLikes] = useState<Array<CommentLikeInterface>>([]);

    const loadLikes = useCallback(
        (lastId?: number) => {
            let endpoint = `comment-likes/${id}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseHuddleCommentLikesGetInterface>(
                endpoint
            ).subscribe((response: ResponseHuddleCommentLikesGetInterface) => {
                if (response?.status && !!response?.data?.length) {
                    if (lastId) {
                        setLikes((value) => value.concat(response?.data));
                    } else {
                        setLikes(response?.data);
                    }
                }
            });
        },
        [id]
    );

    useEffect(() => loadLikes(), [loadLikes]);

    const renderLikeItem = useCallback(
        ({ item }: ListRenderItemInfo<CommentLikeInterface>): JSX.Element => (
            <LikeItem
                onPress={() => {
                    hideModal();
                    openProfile(item.name, item?.profilePhoto);
                }}
                item={item}
            />
        ),
        [hideModal, openProfile]
    );

    const keyExtractor = (item: CommentLikeInterface): string =>
        item?.id?.toString();

    const onEndReached = useCallback(() => {
        if (likes?.length >= 10) {
            loadLikes(likes[likes?.length - 1].id);
        }
    }, [likes, loadLikes]);

    return (
        <View
            style={[
                CommentLikesModalStyle.view,
                {
                    paddingBottom: bottom
                }
            ]}
        >
            <Text style={CommentLikesModalStyle.title}>Comment likes</Text>
            <FlatList
                data={likes}
                renderItem={renderLikeItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator space={10} />}
                onEndReached={onEndReached}
                contentContainerStyle={CommentLikesModalStyle.listContainer}
            />
        </View>
    );
};
