import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { DARK_THEME } from '@navigation/navigation.const';
import { NavigationService } from '@utils/general/NavigationService';

export const Navigation = (): JSX.Element => (
    <NavigationContainer
        ref={(ref) => NavigationService.setNavigationRef(ref)}
        theme={DARK_THEME}
    >
        <RootStackNavigator />
    </NavigationContainer>
);
