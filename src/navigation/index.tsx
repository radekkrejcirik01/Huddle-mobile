import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { DARK_THEME } from '@navigation/navigation.const';

export const Navigation = (): JSX.Element => (
    <NavigationContainer theme={DARK_THEME}>
        <RootStackNavigator />
    </NavigationContainer>
);
