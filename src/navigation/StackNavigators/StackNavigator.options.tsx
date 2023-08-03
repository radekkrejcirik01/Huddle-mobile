import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import COLORS from '@constants/COLORS';
import { StackNavigatorStyle } from '@navigation/StackNavigators/StackNavigator.style';
import DIMENSIONS from '@constants/DIMENSIONS';
import { Back } from '@components/general/Back/Back';

export const NavigationScreenHeader: StackNavigationOptions = {
    headerLeft: () => <Back />,
    headerTintColor: COLORS.WHITE,
    headerStyle: StackNavigatorStyle.headerStyle,
    gestureResponseDistance: DIMENSIONS.width
};

export const NoTitle: StackNavigationOptions = {
    title: null
};
