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
import { useRenderHuddles } from '@hooks/useRenderHuddles';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';

export const NotificationsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openProfilePhoto = useOpenProfilePhoto();

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

    const { openHuddleFromNotification } = useRenderHuddles(loadNotifications);

    const { refreshing, onRefresh } = useRefresh(loadNotifications);

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
                onOpenAccount={() =>
                    openProfilePhoto(item.senderName, item?.profilePhoto)
                }
                onAcceptPersonInvite={() => acceptPersonInvite(item)}
                onOpenChat={() => openChat(item)}
                onOpenHuddle={() => openHuddleFromNotification(item)}
                onConfirmHuddle={() => confirmHuddle(item)}
            />
        ),
        [
            acceptPersonInvite,
            confirmHuddle,
            openChat,
            openHuddleFromNotification,
            openProfilePhoto
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
                ItemSeparatorComponent={() => <ItemSeparator space={25} />}
                contentContainerStyle={
                    NotificationsScreenStyle.listContentContainer
                }
            />
        </View>
    );
};
