import React from 'react';
import { Text } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel
};

export const PeopleTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 26 : 24 }}>💬</Text>
    )
};

export const ProfileTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 25 : 20 }}>‍🙎‍♂️</Text>
    )
};
