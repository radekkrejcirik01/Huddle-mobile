import React, { useCallback, useState } from 'react';
import { Alert, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { useRefresh } from '@hooks/useRefresh';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { getRequestUser, putRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseNotificationsGetInterface
} from '@interfaces/response/Response.interface';
import { AcceptPersonInviteInterface } from '@interfaces/post/Post.inteface';
import { NotificationListItem } from '@components/notifications/NotificationListItem/NotificationListItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const NotificationsScreen = (): JSX.Element => {
    const { firstname, username } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const [data, setData] = useState<Array<NotificationsListProps>>([]);

    const loadNotifications = useCallback(() => {
        getRequestUser<ResponseNotificationsGetInterface>(
            `notifications/${username}`
        ).subscribe((response: ResponseNotificationsGetInterface) => {
            if (response?.status) {
                setData(response?.data);
            }
        });
    }, [username]);

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadNotifications
    );
    const { refreshing, onRefresh } = useRefresh(loadNotifications);

    const openAccount = useCallback(
        (item: NotificationsListProps) => {
            navigateTo(AccountStackNavigatorEnum.PersonProfileScreen, {
                username: item.sender,
                name: item.senderName,
                profilePhoto: item.profilePhoto
            });
        },
        [navigateTo]
    );

    const acceptPersonInvite = useCallback(
        (item: NotificationsListProps) => {
            putRequestUser<ResponseInterface, AcceptPersonInviteInterface>(
                'person',
                {
                    sender: username,
                    receiver: item.sender
                }
            ).subscribe((response) => {
                if (response.status) {
                    loadNotifications();
                }
            });
        },
        [loadNotifications, username]
    );

    const openChat = useCallback((item: NotificationsListProps) => {
        Alert.alert('Open chat');
    }, []);

    const openHuddle = useCallback((item: NotificationsListProps) => {
        Alert.alert('Open huddle');
    }, []);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<NotificationsListProps>): JSX.Element => (
            <NotificationListItem
                listItem={item}
                onOpenAccount={openAccount}
                onAcceptPersonInvite={acceptPersonInvite}
                onOpenChat={openChat}
                onOpenHuddle={openHuddle}
            />
        ),
        [acceptPersonInvite, openAccount, openChat, openHuddle]
    );

    return (
        <View style={NotificationsScreenStyle.container}>
            <FlashList
                data={data}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="white"
                    />
                }
                renderItem={renderItem}
                keyExtractor={(item: NotificationsListProps) =>
                    item?.id?.toString()
                }
                estimatedItemSize={68}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    NotificationsScreenStyle.listContentContainer
                }
            />
        </View>
    );
};
