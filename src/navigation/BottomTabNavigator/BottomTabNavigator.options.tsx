import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel
};

export const PeopleTabOptions: BottomTabNavigationOptions = {
    header: () => (
        <SafeAreaView>
            <Text style={BottomTabNavigatorStyle.peopleHeader}>PingMe</Text>
        </SafeAreaView>
    ),
    headerShown: true,
    tabBarLabel: 'People',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 26 : 24 }}>🔍</Text>
    )
};

export const HomeTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <Text style={{ fontSize: focused ? 25 : 20 }}>🏠‍️</Text>
    )
};
