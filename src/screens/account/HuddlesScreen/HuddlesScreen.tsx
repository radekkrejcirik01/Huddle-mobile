import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useMessaging } from '@hooks/useMessaging';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { HuddlesScreenStyle } from '@screens/account/HuddlesScreen/HuddlesScreen.style';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const HuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    useMessaging();

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);

    const loadHuddles = useCallback(
        (lastId?: number) => {
            if (username) {
                let endpoint = `huddles/${username}`;
                if (lastId) {
                    endpoint += `/${lastId}`;
                }

                getRequestUser<ResponseHuddlesGetInterface>(endpoint).subscribe(
                    (response: ResponseHuddlesGetInterface) => {
                        if (response?.status) {
                            if (!lastId) {
                                setHuddles(response?.data);
                                return;
                            }

                            if (lastId && !!response?.data?.length) {
                                setHuddles((value) =>
                                    value.concat(response?.data)
                                );
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
        renderLargeItem,
        keyExtractor,
        refreshControl,
        onEndReachedLargeItem
    } = useRenderHuddles(huddles, loadHuddles);

    return (
        <View style={HuddlesScreenStyle.container}>
            <FlashList
                data={huddles}
                extraData={huddles}
                renderItem={renderLargeItem}
                keyExtractor={keyExtractor}
                refreshControl={refreshControl}
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReachedLargeItem}
                ItemSeparatorComponent={() => <ItemSeparator space={15} />}
                ListEmptyComponent={
                    <Text style={HuddlesScreenStyle.description}>
                        active Huddles will appear{'\n'}here 👋
                    </Text>
                }
                contentContainerStyle={HuddlesScreenStyle.listContentContainer}
            />
        </View>
    );
};
