import React from 'react';
import {
    createNavigationContainerRef,
    NavigationContainer
} from '@react-navigation/native';
import { useNotifications } from '@hooks/useNotifications';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { DARK_THEME } from '@navigation/navigation.const';

export const Navigation = (): JSX.Element => {
    const navigationRef = createNavigationContainerRef();

    const { initNotification } = useNotifications(navigationRef);

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={initNotification}
            theme={DARK_THEME}
        >
            <RootStackNavigator />
        </NavigationContainer>
    );
};
