import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useOpenChat } from '@hooks/useOpenChat';
import { useRefresh } from '@hooks/useRefresh';
import {
    getRequestUser,
    postRequestUser,
    putRequestUser
} from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponsePeopleNumberGetInterface
} from '@interfaces/response/Response.interface';
import {
    AcceptPersonInviteInterface,
    HuddleConfirmPostInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { NotificationListItem } from '@components/notifications/NotificationListItem/NotificationListItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { setPeopleNumberAction } from '@store/UserReducer';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const useRenderNotifications = (
    loadNotifications: () => void
): {
    renderNotificationItem: ({
        item
    }: ListRenderItemInfo<NotificationsListProps>) => JSX.Element;
    keyNotificationExtractor: (item: NotificationsListProps) => string;
    refreshControl: JSX.Element;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const dispatch = useDispatch();

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadNotifications
    );
    const openProfilePhoto = useOpenProfilePhoto();
    const openChat = useOpenChat();
    const { refreshing, onRefresh } = useRefresh(loadNotifications);

    const getPeopleNumber = useCallback(() => {
        getRequestUser<ResponsePeopleNumberGetInterface>(
            `people-number/${username}`
        ).subscribe((response: ResponsePeopleNumberGetInterface) => {
            if (response?.status) {
                dispatch(setPeopleNumberAction(response?.peopleNumber));
            }
        });
    }, [dispatch, username]);

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

    const renderNotificationItem = useCallback(
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

    const keyNotificationExtractor = (item: NotificationsListProps): string =>
        item?.id?.toString();

    const refreshControl = useMemo(
        (): JSX.Element => (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="white"
            />
        ),
        [onRefresh, refreshing]
    );

    return { renderNotificationItem, keyNotificationExtractor, refreshControl };
};
