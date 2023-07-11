import { useCallback, useEffect } from 'react';
import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useToastMessage } from '@hooks/useToastMessage';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { UnreadMessagesService } from '@utils/general/UnreadMessagesService';

export const useNotifications = (
    navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
): { initNotification: () => void } => {
    const { showToast } = useToastMessage();

    const openHuddle = useCallback(
        (id: number) =>
            navigationRef.current.navigate(
                RootStackNavigatorEnum.AccountStack as never,
                {
                    screen: AccountStackNavigatorEnum.HuddleScreen,
                    params: {
                        huddleId: id
                    }
                } as never
            ),
        [navigationRef]
    );

    const openConversation = useCallback(
        (id: number, name: string, profilePhoto) =>
            navigationRef.current.navigate(
                RootStackNavigatorEnum.AccountStack as never,
                {
                    screen: AccountStackNavigatorEnum.ConversationScreen,
                    params: {
                        conversationId: id,
                        name,
                        profilePhoto
                    }
                } as never
            ),
        [navigationRef]
    );

    const openFriends = useCallback(
        () =>
            navigationRef.current.navigate(
                RootStackNavigatorEnum.AccountStack as never,
                {
                    screen: AccountStackNavigatorEnum.FriendsScreen
                } as never
            ),
        [navigationRef]
    );

    const openInvites = useCallback(
        () =>
            navigationRef.current.navigate(
                RootStackNavigatorEnum.AccountStack as never,
                {
                    screen: AccountStackNavigatorEnum.InvitesScreen
                } as never
            ),
        [navigationRef]
    );

    const initNotification = useCallback(
        () =>
            messaging()
                .getInitialNotification()
                .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage) {
                        switch (remoteMessage.data.type) {
                            case 'huddle':
                                openHuddle(Number(remoteMessage.data.huddleId));
                                break;
                            case 'message':
                                openConversation(
                                    Number(remoteMessage.data.conversationId),
                                    remoteMessage.data.name,
                                    remoteMessage.data.profilePhoto
                                );
                                break;
                            case 'people':
                                openFriends();
                                break;
                            case 'invite':
                                openInvites();
                                break;
                            default:
                                showToast(
                                    remoteMessage?.notification?.title,
                                    remoteMessage?.notification?.body
                                );
                        }
                    }
                }),
        [openConversation, openFriends, openHuddle, openInvites, showToast]
    );

    useEffect(
        () =>
            // On open notification from background state
            messaging().onNotificationOpenedApp(
                (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage) {
                        switch (remoteMessage.data.type) {
                            case 'huddle':
                                openHuddle(Number(remoteMessage.data.huddleId));
                                break;
                            case 'message':
                                openConversation(
                                    Number(remoteMessage.data.conversationId),
                                    remoteMessage.data.name,
                                    remoteMessage.data.profilePhoto
                                );
                                break;
                            case 'people':
                                openFriends();
                                break;
                            case 'invite':
                                openInvites();
                                break;
                            default:
                                showToast(
                                    remoteMessage?.notification?.title,
                                    remoteMessage?.notification?.body
                                );
                        }
                    }
                }
            ),
        [openConversation, openFriends, openHuddle, openInvites, showToast]
    );

    useEffect(
        () =>
            // On in app notification
            messaging().onMessage(async (remoteMessage) => {
                if (remoteMessage) {
                    switch (remoteMessage.data.type) {
                        case 'huddle':
                            showToast(
                                remoteMessage?.notification?.title,
                                remoteMessage?.notification?.body,
                                () =>
                                    openHuddle(
                                        Number(remoteMessage.data.huddleId)
                                    )
                            );
                            break;
                        case 'message':
                            if (
                                navigationRef.current.getCurrentRoute().name !==
                                    'ChatsTab' &&
                                navigationRef.current.getCurrentRoute().name !==
                                    'ConversationScreen'
                            ) {
                                showToast(
                                    remoteMessage?.notification?.title,
                                    remoteMessage?.notification?.body,
                                    () =>
                                        openConversation(
                                            Number(
                                                remoteMessage.data
                                                    .conversationId
                                            ),
                                            remoteMessage.data.name,
                                            remoteMessage.data.profilePhoto
                                        )
                                );
                                UnreadMessagesService.loadUnread();
                            }
                            break;
                        case 'people':
                            showToast(
                                remoteMessage?.notification?.title,
                                remoteMessage?.notification?.body,
                                () => openFriends()
                            );
                            break;
                        case 'invite':
                            showToast(
                                remoteMessage?.notification?.title,
                                remoteMessage?.notification?.body,
                                () => openInvites()
                            );
                            break;
                        default:
                            showToast(
                                remoteMessage?.notification?.title,
                                remoteMessage?.notification?.body
                            );
                    }
                }
            }),
        [
            navigationRef,
            openConversation,
            openFriends,
            openHuddle,
            openInvites,
            showToast
        ]
    );

    return { initNotification };
};
