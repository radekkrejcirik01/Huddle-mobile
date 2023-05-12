import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { useRefresh } from '@hooks/useRefresh';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useOpenChat } from '@hooks/useOpenChat';
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
    ResponseNotificationsGetInterface,
    ResponsePeopleNumberGetInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptPersonInviteInterface,
    HuddleConfirmPostInterface
} from '@interfaces/post/Post.inteface';
import { NotificationListItem } from '@components/notifications/NotificationListItem/NotificationListItem';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import {
    setNotificationsNumberAction,
    setPeopleNumberAction
} from '@store/UserReducer';

export const NotificationsScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const dispatch = useDispatch();

    const openProfilePhoto = useOpenProfilePhoto();
    const openChat = useOpenChat();

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

    const getPeopleNumber = useCallback(() => {
        getRequestUser<ResponsePeopleNumberGetInterface>(
            `people-number/${username}`
        ).subscribe((response: ResponsePeopleNumberGetInterface) => {
            if (response?.status) {
                dispatch(setPeopleNumberAction(response?.peopleNumber));
            }
        });
    }, [dispatch, username]);

    useEffect(() => {
        dispatch(setNotificationsNumberAction(0));

        return () => {};
    }, [dispatch]);

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadNotifications
    );

    const { refreshing, onRefresh } = useRefresh(loadNotifications);

    const acceptPersonInvite = useCallback(
        (item: NotificationsListProps) => {
            putRequestUser<ResponseInterface, AcceptPersonInviteInterface>(
                'person',
                {
                    id: item?.eventId,
                    sender: username,
                    receiver: item?.sender
                }
            ).subscribe((response) => {
                if (response?.status) {
                    loadNotifications();
                    getPeopleNumber();
                }
            });
        },
        [getPeopleNumber, loadNotifications, username]
    );

    const openHuddleFromNotification = useCallback(
        (item: NotificationsListProps) => {
            navigateTo(AccountStackNavigatorEnum.HuddleScreen, {
                huddleId: item?.eventId
            });
        },
        [navigateTo]
    );

    const confirmHuddle = useCallback(
        (item: NotificationsListProps) => {
            postRequestUser<ResponseInterface, HuddleConfirmPostInterface>(
                'huddle/confirm',
                {
                    huddleId: item?.eventId,
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
                onOpenChat={() =>
                    openChat(item.senderName, item?.profilePhoto, item?.sender)
                }
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
