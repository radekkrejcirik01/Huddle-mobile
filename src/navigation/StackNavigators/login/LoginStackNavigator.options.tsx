import React from 'react';
import {
    HeaderStyleInterpolators,
    StackNavigationOptions
} from '@react-navigation/stack';
import { LoginStackNavigatorStyle } from '@navigation/StackNavigators/login/LoginStackNavigator.style';

export const LoginScreenOptions: StackNavigationOptions = {
    headerTitle: '',
    // headerLeft: () => <HeaderLeft />,
    headerStyle: {
        ...LoginStackNavigatorStyle.header
    },
    headerLeftContainerStyle: {
        ...LoginStackNavigatorStyle.headerLeft
    }
};

export const ForFade: StackNavigationOptions = {
    headerStyleInterpolator: HeaderStyleInterpolators.forFade
};

export const ForNoAnimation: StackNavigationOptions = {
    headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation
};
