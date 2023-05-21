import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useMessaging } from '@hooks/useMessaging';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { ProfileTabHeader } from '@components/profile/ProfileTabHeader/ProfileTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { AddHuddle } from '@components/huddles/AddHuddle/AddHuddle';

export const ProfileScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    useMessaging();

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);

    const loadHuddles = useCallback(
        (lastId?: number) => {
            if (username) {
                let endpoint = `user-huddles/${username}`;
                if (lastId) {
                    endpoint += `/${lastId}`;
                }

                getRequestUser<ResponseHuddlesGetInterface>(endpoint).subscribe(
                    (response: ResponseHuddlesGetInterface) => {
                        if (response?.status && !!response?.data?.length) {
                            if (lastId) {
                                setHuddles((value) =>
                                    value.concat(response?.data)
                                );
                            } else {
                                setHuddles(response?.data);
                            }
                        }
                    }
                );
            }
        },
        [username]
    );

    useEffect(() => loadHuddles(), [loadHuddles]);

    const {
        renderSmallItem,
        keyExtractor,
        refreshControl,
        onScrollBeginDrag,
        onEndReachedSmallItem
    } = useRenderHuddles(huddles, loadHuddles);

    return (
        <View style={ProfileScreenStyle.container}>
            <FlashList
                ListHeaderComponent={
                    <>
                        <ProfileTabHeader />
                        <View style={ProfileScreenStyle.contentHeaderView}>
                            <Text style={ProfileScreenStyle.title}>
                                Your Huddles
                            </Text>
                            <AddHuddle />
                        </View>
                    </>
                }
                data={huddles}
                extraData={huddles}
                renderItem={renderSmallItem}
                numColumns={3}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                onScrollBeginDrag={onScrollBeginDrag}
                onEndReached={onEndReachedSmallItem}
                ListEmptyComponent={
                    <Text style={ProfileScreenStyle.description}>
                        your Huddles will appear{'\n'}here 👋
                    </Text>
                }
            />
        </View>
    );
};
