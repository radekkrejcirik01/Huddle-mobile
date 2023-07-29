import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useMessaging } from '@hooks/useMessaging';
import { useNavigation } from '@hooks/useNavigation';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { HuddlesScreenStyle } from '@screens/account/HuddlesScreen/HuddlesScreen.style';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { HuddlesHeader } from '@components/huddles/HuddlesHeader/HuddlesHeader';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';

export const HuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    useMessaging();
    const { top } = useSafeAreaInsets();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.BottomTabBar);

    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);
    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);

    const firstLaunchData = useMemo(
        (): Array<HuddleItemInterface> => [
            {
                id: 1,
                createdBy: 'sender',
                name: 'Sender',
                topic: 'This is Huddle, a post with idea of doing something, pressing 👋 you send an interest!',
                color: 0
            }
        ],
        []
    );

    const loadHuddles = useCallback(
        (lastId?: number) => {
            if (username) {
                let endpoint = 'huddles';
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

    useFocusEffect(loadHuddles);

    const getFirstLaunch = async () => {
        const firstLaunch = await PersistStorage.getItem(
            PersistStorageKeys.FIRST_LAUNCH
        );

        if (!firstLaunch) {
            setIsFirstLaunch(true);
            PersistStorage.setItem(
                PersistStorageKeys.FIRST_LAUNCH,
                'launched'
            ).catch();
        }
    };

    useEffect(() => {
        getFirstLaunch().then();
    }, []);

    const data = useMemo(
        () => (isFirstLaunch && !huddles?.length ? firstLaunchData : huddles),
        [firstLaunchData, huddles, isFirstLaunch]
    );

    const {
        renderLargeItem,
        keyExtractor,
        refreshControl,
        onEndReachedLargeItem
    } = useRenderHuddles(huddles, loadHuddles);

    return (
        <View style={[HuddlesScreenStyle.container, { top }]}>
            <HuddlesHeader onHuddleCreate={loadHuddles} />
            <View style={HuddlesScreenStyle.list}>
                <FlashList
                    data={data}
                    extraData={huddles}
                    renderItem={renderLargeItem}
                    keyExtractor={keyExtractor}
                    refreshControl={refreshControl}
                    estimatedItemSize={68}
                    showsVerticalScrollIndicator={false}
                    onEndReached={onEndReachedLargeItem}
                    ItemSeparatorComponent={() => <ItemSeparator space={10} />}
                    ListEmptyComponent={
                        <>
                            <Text style={HuddlesScreenStyle.description}>
                                I love pressing that 👋 button too
                            </Text>
                            <Text style={HuddlesScreenStyle.subDescription}>
                                huddles last only 48 hours tho
                            </Text>
                        </>
                    }
                    contentContainerStyle={
                        HuddlesScreenStyle.listContentContainer
                    }
                    ListFooterComponent={
                        isFirstLaunch &&
                        !huddles?.length && (
                            <View style={HuddlesScreenStyle.footerContainer}>
                                <Text
                                    style={HuddlesScreenStyle.footerTitleText}
                                >
                                    Add Friends to see theirs huddles 🍾
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigateTo(
                                            BottomTabNavigatorEnum.FriendsTab
                                        )
                                    }
                                    style={HuddlesScreenStyle.footerButtonView}
                                >
                                    <Text
                                        style={
                                            HuddlesScreenStyle.footerButtonText
                                        }
                                    >
                                        Add Friends
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                />
            </View>
        </View>
    );
};
