import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseGetHuddleLikesInterface } from '@interfaces/response/Response.interface';
import { LikeItem } from '@components/huddles/LikeItem/LikeItem';
import {
    HuddleLike,
    HuddleLikesModalProps
} from '@components/huddles/HuddleLikesModal/HuddleLikesModal.props';
import { HuddleLikesModalStyle } from '@components/huddles/HuddleLikesModal/HuddleLikesModal.style';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const HuddleLikesModal = ({
    id,
    hideModal
}: HuddleLikesModalProps): JSX.Element => {
    const openProfile = useOpenProfilePhoto();
    const { bottom } = useSafeAreaInsets();

    const [likes, setLikes] = useState<Array<HuddleLike>>([]);

    const loadHuddleLikes = useCallback(
        (lastId?: number) => {
            let endpoint = `huddle-likes/${id}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<ResponseGetHuddleLikesInterface>(endpoint).subscribe(
                (response: ResponseGetHuddleLikesInterface) => {
                    if (response?.status && !!response?.data?.length) {
                        if (lastId) {
                            setLikes((value) => value.concat(response?.data));
                        } else {
                            setLikes(response?.data);
                        }
                    }
                }
            );
        },
        [id]
    );

    useEffect(() => loadHuddleLikes(), [loadHuddleLikes]);

    const renderLikeItem = useCallback(
        ({ item }: ListRenderItemInfo<HuddleLike>): JSX.Element => (
            <LikeItem
                item={item}
                onPress={() => {
                    hideModal();
                    openProfile(item.name, item?.profilePhoto);
                }}
            />
        ),
        [hideModal, openProfile]
    );

    const keyExtractor = (item: HuddleLike): string => item?.id?.toString();

    const onEndReached = useCallback(() => {
        if (likes?.length >= 10) {
            loadHuddleLikes(likes[likes?.length - 1].id);
        }
    }, [likes, loadHuddleLikes]);

    return (
        <View
            style={[
                HuddleLikesModalStyle.view,
                {
                    paddingBottom: bottom
                }
            ]}
        >
            <Text style={HuddleLikesModalStyle.title}>Likes</Text>
            <FlatList
                data={likes}
                renderItem={renderLikeItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ItemSeparator space={10} />}
                onEndReached={onEndReached}
                contentContainerStyle={HuddleLikesModalStyle.listContainer}
            />
        </View>
    );
};
