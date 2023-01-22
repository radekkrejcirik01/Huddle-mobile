import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { DARK_THEME } from '@navigation/navigation.const';
import { ReducerProps } from '@store/index/index.props';

export const Navigation = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const onReady = useCallback(() => {
        if (!username) {
            SplashScreen.hide();
        }
    }, [username]);
    return (
        <NavigationContainer theme={DARK_THEME} onReady={onReady}>
            <RootStackNavigator />
        </NavigationContainer>
    );
};
