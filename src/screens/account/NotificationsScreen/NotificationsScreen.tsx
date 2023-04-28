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
import {
    getRequestUser,
    postRequestUser,
    putRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseNotificationsGetInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptPersonInviteInterface,
    HuddleConfirmPostInterface
} from '@interfaces/post/Post.inteface';
import { NotificationListItem } from '@components/notifications/NotificationListItem/NotificationListItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { HuddleModalScreen } from '@components/huddles/HuddleModalScreen/HuddleModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { useRenderHuddles } from '@hooks/useRenderHuddles';

export const NotificationsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

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

    const {
        huddleOpened,
        huddleItem,
        openHuddleFromNotification,
        onPressProfilePhoto,
        onPressInteract,
        hideHuddle
    } = useRenderHuddles([], loadNotifications);

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
                if (response?.status) {
                    loadNotifications();
                }
            });
        },
        [loadNotifications, username]
    );

    const openChat = useCallback((item: NotificationsListProps) => {
        Alert.alert('Open chat');
    }, []);

    const confirmHuddle = useCallback(
        (item: NotificationsListProps) => {
            postRequestUser<ResponseInterface, HuddleConfirmPostInterface>(
                'huddle/confirm',
                {
                    huddleId: item?.huddleId,
                    sender: username,
                    receiver: item?.sender
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadNotifications();
                }
            });
        },
        [loadNotifications, username]
    );

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<NotificationsListProps>): JSX.Element => (
            <NotificationListItem
                listItem={item}
                onOpenAccount={openAccount}
                onAcceptPersonInvite={acceptPersonInvite}
                onOpenChat={openChat}
                onOpenHuddle={openHuddleFromNotification}
                onConfirmHuddle={confirmHuddle}
            />
        ),
        [
            acceptPersonInvite,
            confirmHuddle,
            openAccount,
            openChat,
            openHuddleFromNotification
        ]
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
            <Modal
                isVisible={huddleOpened}
                content={
                    <HuddleModalScreen
                        huddle={huddleItem}
                        onPressProfilePhoto={onPressProfilePhoto}
                        onPressInteract={onPressInteract}
                        onEdited={loadNotifications}
                        onConfirm={loadNotifications}
                    />
                }
                backdropOpacity={0.7}
                onClose={hideHuddle}
            />
        </View>
    );
};
