import React from 'react';
import { Text } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import { FriendsTabHeader } from '@components/friends/FriendsTabHeader/FriendsTabHeader';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel
};

export const HomeTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 25 : 20 }}>🏠‍️</Text>
    )
};

export const HuddlesTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Huddles',
    tabBarIcon: ({ focused }) => (
        <Text
            style={[
                { fontSize: focused ? 24 : 20 },
                BottomTabNavigatorStyle.right
            ]}
        >
            👋
        </Text>
    )
};

export const ChatsTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Chats',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 24 : 19 }}>💬</Text>
    )
};

export const FriendsTabOptions: BottomTabNavigationOptions = {
    header: () => <FriendsTabHeader />, // FriendsScreen is reused in nested Friends screen
    headerShown: true,
    tabBarLabel: 'Friends',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 24 : 20 }}>🔍</Text>
    )
};
