import React from 'react';
import {
    HeaderStyleInterpolators,
    StackNavigationOptions
} from '@react-navigation/stack';
import { LoginStackNavigatorStyle } from '@navigation/StackNavigators/login/LoginStackNavigator.style';
import { Back } from '@components/general/Back/Back';
import DIMENSIONS from '@constants/DIMENSIONS';

export const RegistrationScreenOptions: StackNavigationOptions = {
    headerTitle: 'New account',
    headerLeft: () => <Back />,
    headerStyle: LoginStackNavigatorStyle.header,
    headerTitleStyle: LoginStackNavigatorStyle.headerTitle,
    headerLeftContainerStyle: LoginStackNavigatorStyle.headerLeft,
    gestureResponseDistance: DIMENSIONS.width
};

export const ForNoAnimation: StackNavigationOptions = {
    headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation
};
