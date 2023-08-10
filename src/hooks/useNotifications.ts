import { useCallback, useEffect } from 'react';
import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import store from '@store/index/index';
import { setTyping } from '@store/TypingReducer';

export const useNotifications = (
    navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
): { initNotification: () => void } => {
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
                    screen: AccountStackNavigatorEnum.ContactsScreen
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
                            case 'conversation':
                                openConversation(
                                    Number(remoteMessage.data.conversationId),
                                    remoteMessage.data.name,
                                    remoteMessage.data.profilePhoto
                                );
                                break;
                            case 'contacts':
                                openFriends();
                                break;
                            default:
                        }
                    }
                }),
        [openConversation, openFriends]
    );

    useEffect(
        () =>
            // On open notification from background state
            messaging().onNotificationOpenedApp(
                (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage) {
                        switch (remoteMessage.data.type) {
                            case 'conversation':
                                openConversation(
                                    Number(remoteMessage.data.conversationId),
                                    remoteMessage.data.name,
                                    remoteMessage.data.profilePhoto
                                );
                                break;
                            case 'contacts':
                                openFriends();
                                break;
                            default:
                        }
                    }
                }
            ),
        [openConversation, openFriends]
    );

    useEffect(
        () =>
            // On in app notification
            messaging().onMessage(
                (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage?.data?.type === 'typing') {
                        store.dispatch(setTyping(remoteMessage?.data));
                        return;
                    }
                    if (remoteMessage?.data?.type !== 'conversation') {
                        Toast.show({
                            text1: remoteMessage.notification.title,
                            text2: remoteMessage.notification.body
                        });
                    }
                }
            ),
        []
    );

    return { initNotification };
};
