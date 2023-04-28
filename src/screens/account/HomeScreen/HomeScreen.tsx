import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { useMessaging } from '@hooks/useMessaging';
import { getRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesGetInterface,
    ResponseUserGetInterface
} from '@interfaces/response/Response.interface';
import { useNotifications } from '@hooks/useNotifications';
import { HomeTabHeader } from '@components/home/HomeTabHeader/HomeTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { HuddleModalScreen } from '@components/huddles/HuddleModalScreen/HuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { setUserStateAction } from '@store/UserReducer';

export const HomeScreen = (): JSX.Element => {
    const { user } = useSelector((state: ReducerProps) => state.user);
    const dispatch = useDispatch();

    useMessaging();

    const [huddles, setHuddles] = useState<Array<HuddleItemInterface>>([]);

    const refreshUser = useCallback(() => {
        getRequestUser<ResponseUserGetInterface>(
            `user/${user?.username}`
        ).subscribe((response: ResponseUserGetInterface) => {
            if (response?.status) {
                dispatch(setUserStateAction(response?.data));
            }
        });
    }, [dispatch, user?.username]);

    const loadHuddles = useCallback(() => {
        if (user?.username) {
            getRequestUser<ResponseHuddlesGetInterface>(
                `huddles/user/${user?.username}`
            ).subscribe((response: ResponseHuddlesGetInterface) => {
                if (response?.status) {
                    setHuddles(response?.data);
                }
            });
        }
    }, [user?.username]);

    useEffect(() => loadHuddles(), [loadHuddles]);

    useFocusEffect(refreshUser);

    const {
        renderSmallItem,
        keyExtractor,
        refreshControl,
        huddleOpened,
        huddleItem,
        onPressProfilePhoto,
        onPressInteract,
        hideHuddle
    } = useRenderHuddles(huddles, loadHuddles);

    useNotifications(refreshUser, loadHuddles);

    return (
        <View style={HomeScreenStyle.container}>
            <HomeTabHeader />
            <View style={HomeScreenStyle.content}>
                <Text style={HomeScreenStyle.title}>Your Huddles</Text>
                {huddles?.length ? (
                    <>
                        <FlashList
                            data={huddles}
                            extraData={huddles}
                            renderItem={renderSmallItem}
                            numColumns={3}
                            keyExtractor={keyExtractor}
                            refreshControl={refreshControl}
                            estimatedItemSize={68}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={
                                HomeScreenStyle.contentContainer
                            }
                        />
                        <Modal
                            isVisible={huddleOpened}
                            content={
                                <HuddleModalScreen
                                    huddle={huddleItem}
                                    onPressProfilePhoto={onPressProfilePhoto}
                                    onPressInteract={onPressInteract}
                                    onEdited={loadHuddles}
                                />
                            }
                            backdropOpacity={0.7}
                            onClose={hideHuddle}
                        />
                    </>
                ) : (
                    <Text style={HomeScreenStyle.description}>
                        your confirmed Huddles{'\n'}will appear here 👋
                    </Text>
                )}
            </View>
        </View>
    );
};
