import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { useToastMessage } from '@hooks/useToastMessage';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { NavigationService } from '@utils/general/NavigationService';
import { setLoadConversation, setLoadRead } from '@store/Conversation';
import { setIsTyping } from '@store/TypingReducer';

export const useNotifications = (
    refreshUser: () => void,
    refreshHangouts: () => void
) => {
    const { isReady } = useSelector(
        (state: ReducerProps) => state.navigationState
    );
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const { conversationId: chatId } = useSelector(
        (state: ReducerProps) => state.conversation
    );
    const dispatch = useDispatch();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { showToast } = useToastMessage();

    const openChat = useCallback(
        (conversationId: string) => {
            if (isReady && username) {
                navigateTo(AccountStackNavigatorEnum.ConversationScreen, {
                    conversationId: Number(conversationId)
                });
            }
        },
        [isReady, navigateTo, username]
    );

    useEffect(() => {
        // On open notification from killed state
        messaging()
            .getInitialNotification()
            .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                if (remoteMessage && remoteMessage.data.type === 'message') {
                    openChat(remoteMessage?.data?.conversationId);
                }
            });
    }, [openChat]);

    useEffect(() => {
        // On open notification from background state
        messaging().onNotificationOpenedApp(
            (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                if (remoteMessage && remoteMessage.data.type === 'message') {
                    openChat(remoteMessage?.data?.conversationId);
                }
            }
        );
    }, [openChat]);

    useEffect(
        () =>
            // On in app notification
            messaging().onMessage(async (remoteMessage) => {
                if (remoteMessage) {
                    const screen =
                        NavigationService.getNavigationRef().getCurrentRoute()
                            .name;

                    if (remoteMessage?.data?.type === 'typing') {
                        const typing = {
                            conversationId: Number(
                                remoteMessage?.data?.conversationId
                            ),
                            username: remoteMessage?.data?.username,
                            value: Number(remoteMessage?.data?.value)
                        };
                        dispatch(setIsTyping(typing));
                        return;
                    }

                    if (
                        screen === 'ChatScreen' &&
                        Number(remoteMessage?.data?.conversationId) === chatId
                    ) {
                        if (remoteMessage?.data?.type === 'message') {
                            dispatch(setLoadConversation(true));
                        }
                        if (remoteMessage?.data?.type === 'conversationRead') {
                            dispatch(setLoadRead(true));
                        }
                        return;
                    }

                    if (remoteMessage?.data?.type !== 'conversationRead') {
                        if (
                            remoteMessage?.data?.type === 'hangout' &&
                            screen === 'HomeTab'
                        ) {
                            refreshHangouts();
                        }

                        if (screen === 'HomeTab') {
                            refreshUser();
                        }
                        showToast(
                            remoteMessage?.notification?.title,
                            remoteMessage?.notification?.body,
                            () => openChat(remoteMessage?.data?.conversationId)
                        );
                    }
                }
            }),
        [dispatch, chatId, openChat, refreshHangouts, refreshUser, showToast]
    );
};
