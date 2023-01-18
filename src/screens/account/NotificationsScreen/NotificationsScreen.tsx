import React, { useCallback, useEffect, useState } from 'react';
import { Alert, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { NotificationsListItem } from '@components/notifícations/NotificationsListItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseNotificationsGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';

export const NotificationsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [data, setData] = useState<Array<NotificationsListProps>>([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadNotifications = useCallback(() => {
        postRequest<ResponseNotificationsGetInterface, UserGetPostInterface>(
            'https://n4i9nm6vo6.execute-api.eu-central-1.amazonaws.com/user/get/notifications',
            {
                username
            }
        ).subscribe((response: ResponseNotificationsGetInterface) => {
            if (response?.status) {
                setData(response?.data);
            }
        });
    }, [username]);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            loadNotifications();
        }, 1000);
    }, [loadNotifications]);

    const onAcceptInvite = useCallback((item: NotificationsListProps) => {
        Alert.alert(`people invitation id: ${item.id}`);
    }, []);

    const onOpenHangout = useCallback((item: NotificationsListProps) => {
        Alert.alert(`hangout id: ${item.id}`);
    }, []);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<NotificationsListProps>): JSX.Element => (
            <NotificationsListItem
                item={item}
                onAcceptInvite={onAcceptInvite}
                onOpenHangout={onOpenHangout}
            />
        ),
        [onAcceptInvite, onOpenHangout]
    );

    return (
        <View style={NotificationsScreenStyle.container}>
            <View style={NotificationsScreenStyle.flashListView}>
                <FlashList
                    data={data}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={refresh}
                            tintColor="white"
                        />
                    }
                    renderItem={renderItem}
                    estimatedItemSize={68}
                />
            </View>
        </View>
    );
};
