import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import COLORS from '@constants/COLORS';
import { ChatsTabIcon } from '@components/chats/ChatsTabIcon/ChatsTabIcon';
import { ProfileHeader } from '@components/profile/ProfileHeader/ProfileHeader';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerTintColor: COLORS.WHITE,
    headerStyle: BottomTabNavigatorStyle.header,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel,
    title: null
};

export const ChatsTabOptions: BottomTabNavigationOptions = {
    title: 'Chats',
    headerRight: () => <ProfileHeader />,
    tabBarLabel: 'New chat',
    tabBarIcon: () => <ChatsTabIcon />
};
