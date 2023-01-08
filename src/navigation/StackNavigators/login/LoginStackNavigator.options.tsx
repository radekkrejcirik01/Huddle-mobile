import React from 'react';
import {
    HeaderStyleInterpolators,
    StackNavigationOptions
} from '@react-navigation/stack';
import { LoginStackNavigatorStyle } from '@navigation/StackNavigators/login/LoginStackNavigator.style';
import { HeaderLeft } from '@components/general/HeaderLeft/HeaderLeft';

export const RegistrationScreenOptions: StackNavigationOptions = {
    headerTitle: 'New account',
    headerLeft: () => <HeaderLeft />,
    headerStyle: LoginStackNavigatorStyle.header,
    headerTitleStyle: LoginStackNavigatorStyle.headerTitle,
    headerLeftContainerStyle: LoginStackNavigatorStyle.headerLeft
};

export const ForNoAnimation: StackNavigationOptions = {
    headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation
};
