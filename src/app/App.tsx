import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import store from '@store/index/index';
import { BAR_STYLE } from '@app/App.const';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';
import { ToastMessage } from '@components/general/ToastMessage/ToastMessage';
import { isiOS } from '@functions/checking-functions';
import { UnreadMessagesService } from '@utils/general/UnreadMessagesService';

const App = () => {
    PreloadService.init().catch();

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (nextAppState === 'active') {
                    if (isiOS()) {
                        PushNotificationIOS.setApplicationIconBadgeNumber(0);
                        UnreadMessagesService.loadUnread();
                    }
                }
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <ActionSheetProvider>
            <SafeAreaProvider>
                <StatusBar animated barStyle={BAR_STYLE} />
                <Provider store={store}>
                    <Navigation />
                </Provider>
                <ToastMessage />
            </SafeAreaProvider>
        </ActionSheetProvider>
    );
};

export default App;
