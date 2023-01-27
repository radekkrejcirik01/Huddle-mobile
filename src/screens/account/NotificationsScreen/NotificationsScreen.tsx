import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { NotificationsListItem } from '@components/notifícations/NotificationsListItem';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseNotificationsGetInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptPeopleInvitationInterface,
    UserGetPostInterface
} from '@interfaces/post/Post.inteface';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const NotificationsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [data, setData] = useState<Array<NotificationsListProps>>([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadNotifications = useCallback(() => {
        postRequest<ResponseNotificationsGetInterface, UserGetPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get/notifications',
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

    const onAcceptPeopleInvite = useCallback((item: NotificationsListProps) => {
        postRequest<ResponseInterface, AcceptPeopleInvitationInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/accept/people/invitation',
            {
                id: item.id,
                value: item.confirmed
            }
        ).subscribe();
    }, []);

    const onOpenHangout = useCallback(
        (item: NotificationsListProps) => {
            navigateTo(AccountStackNavigatorEnum.EventScreen, {
                hangoutId: item.id,
                confirmed: item.confirmed
            });
        },
        [navigateTo]
    );

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<NotificationsListProps>): JSX.Element => (
            <NotificationsListItem
                item={item}
                onAcceptInvite={onAcceptPeopleInvite}
                onOpenHangout={onOpenHangout}
            />
        ),
        [onAcceptPeopleInvite, onOpenHangout]
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
