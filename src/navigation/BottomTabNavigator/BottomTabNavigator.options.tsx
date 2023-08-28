import React from 'react';
import { Alert } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import COLORS from '@constants/COLORS';
import { ProfileHeader } from '@components/profile/ProfileHeader/ProfileHeader';
import { PostHuddleButton } from '@components/huddles/PostHuddleButton/PostHuddleButton';
import { ChatsTabIcon } from '@components/chats/ChatsTabIcon/ChatsTabIcon';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerTintColor: COLORS.WHITE,
    headerStyle: BottomTabNavigatorStyle.header,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel,
    title: null,
    tabBarShowLabel: false
};

export const ChatsTabOptions: BottomTabNavigationOptions = {
    title: 'Chats',
    headerLeft: () => <ChatsTabIcon />,
    headerRight: () => <ProfileHeader />,
    tabBarIcon: () => (
        <PostHuddleButton
            onCreateHuddle={() => {
                Alert.alert('Posted');
            }}
        />
    )
};
