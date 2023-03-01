import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import COLORS from '@constants/COLORS';
import { StackNavigatorStyle } from '@navigation/StackNavigators/StackNavigator.style';
import DIMENSIONS from '@constants/DIMENSIONS';
import { HeaderLeft } from '@components/general/HeaderLeft/HeaderLeft';

export const NavigationScreenHeader: StackNavigationOptions = {
    headerLeft: () => <HeaderLeft />,
    headerTintColor: COLORS.WHITE,
    headerStyle: StackNavigatorStyle.navigationScreen,
    gestureResponseDistance: DIMENSIONS.width
};

export const NoTitle: StackNavigationOptions = {
    title: null
};
