import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { useMessaging } from '@hooks/useMessaging';
import { getRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseHuddlesGetInterface,
    ResponseUserGetInterface
} from '@interfaces/response/Response.interface';
import { useNotifications } from '@hooks/useNotifications';
import { ProfileTabHeader } from '@components/profile/ProfileTabHeader/ProfileTabHeader';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { setUserStateAction } from '@store/UserReducer';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const ProfileScreen = (): JSX.Element => {
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

    useFocusEffect(
        useCallback(() => {
            loadHuddles();
            refreshUser();
        }, [loadHuddles, refreshUser])
    );

    const { renderSmallItem, keyExtractor, refreshControl } =
        useRenderHuddles(loadHuddles);

    useNotifications(refreshUser, loadHuddles);

    return (
        <View style={ProfileScreenStyle.container}>
            <ProfileTabHeader />
            <View style={ProfileScreenStyle.content}>
                <View style={ProfileScreenStyle.contentHeaderView}>
                    <Text style={ProfileScreenStyle.title}>Your Huddles</Text>
                    <TouchableOpacity style={ProfileScreenStyle.addButtonView}>
                        <Text style={ProfileScreenStyle.addButtonText}>
                            Add new
                        </Text>
                        <Icon
                            name={IconEnum.PLUS}
                            size={12}
                            style={ProfileScreenStyle.plusIcon}
                        />
                    </TouchableOpacity>
                </View>
                <FlashList
                    data={huddles}
                    extraData={huddles}
                    renderItem={renderSmallItem}
                    numColumns={3}
                    keyExtractor={keyExtractor}
                    refreshControl={refreshControl}
                    estimatedItemSize={68}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={ProfileScreenStyle.description}>
                            your confirmed Huddles{'\n'}will appear here 👋
                        </Text>
                    }
                    contentContainerStyle={ProfileScreenStyle.contentContainer}
                />
            </View>
        </View>
    );
};
