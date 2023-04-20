import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import { useMessaging } from '@hooks/useMessaging';
import { getRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesGetInterface,
    ResponseInterface,
    ResponseUserGetInterface
} from '@interfaces/response/Response.interface';
import { setUserStateAction } from '@store/UserReducer';
import { useNotifications } from '@hooks/useNotifications';
import { HomeTabHeader } from '@components/home/HomeTabHeader/HomeTabHeader';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { HuddleModalScreen } from '@components/huddles/HuddleModalScreen/HuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { AddHuddlePostInterface } from '@interfaces/post/Post.inteface';

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
        getRequestUser<ResponseHuddlesGetInterface>(
            `huddles/user/${user?.username}`
        ).subscribe((response: ResponseHuddlesGetInterface) => {
            if (response?.status) {
                setHuddles(response?.data);
            }
        });
    }, [user?.username]);

    const {
        renderItem,
        keyExtractor,
        refreshControl,
        huddleOpened,
        huddleOpenedRef,
        huddleItem,
        onPressProfilePhoto,
        onInteract,
        hideHuddle
    } = useRenderHuddles(huddles, loadHuddles);

    useNotifications(refreshUser, loadHuddles);

    const onFocus = useCallback(() => {
        if (user?.username) {
            refreshUser();
            loadHuddles();
        }
    }, [loadHuddles, refreshUser, user?.username]);

    useNavigation(RootStackNavigatorEnum.AccountStack, onFocus);

    useEffect(() => {
        if (user?.username) {
            loadHuddles();
        }
    }, [loadHuddles, user?.username]);

    const createHuddle = useCallback(() => {
        postRequestUser<ResponseInterface, AddHuddlePostInterface>('huddle', {
            sender: user?.username,
            what: 'Go for a beer 🍻',
            where: 'B',
            when: 'C',
            people: ['radekkrejcirik']
        }).subscribe();
    }, [user?.username]);

    return (
        <View style={HomeScreenStyle.container}>
            <HomeTabHeader />
            <View style={HomeScreenStyle.content}>
                <Text style={HomeScreenStyle.title}>Active Huddles</Text>
                {huddles?.length ? (
                    <>
                        <FlashList
                            data={huddles}
                            renderItem={renderItem}
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
                                    ref={huddleOpenedRef}
                                    huddle={huddleItem}
                                    onPressProfilePhoto={onPressProfilePhoto}
                                    onInteract={onInteract}
                                />
                            }
                            backdropOpacity={0.7}
                            onClose={hideHuddle}
                        />
                    </>
                ) : (
                    <Text style={HomeScreenStyle.description}>
                        your upcoming Huddles{'\n'}will appear here 👋
                    </Text>
                )}
            </View>
            <TouchableOpacity
                onPress={createHuddle}
                style={HomeScreenStyle.addHuddleTouchableOpacity}
            >
                <Text style={HomeScreenStyle.addHuddleText}>Add a Huddle</Text>
            </TouchableOpacity>
        </View>
    );
};
