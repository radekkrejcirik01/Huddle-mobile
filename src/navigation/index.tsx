import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { DARK_THEME } from '@navigation/navigation.const';
import { ReducerProps } from '@store/index/index.props';
import { setIsReady } from '@store/NavigationState';
import { NavigationService } from '@utils/general/NavigationService';

export const Navigation = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const dispatch = useDispatch();

    const onReady = useCallback(() => {
        dispatch(setIsReady(true));

        if (!username) {
            SplashScreen.hide();
        }
    }, [dispatch, username]);

    return (
        <NavigationContainer
            ref={(ref) => NavigationService.setNavigationRef(ref)}
            onReady={onReady}
            theme={DARK_THEME}
        >
            <RootStackNavigator />
        </NavigationContainer>
    );
};
