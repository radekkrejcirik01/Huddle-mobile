import React from 'react';
import { Text } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import { PeopleTabHeader } from '@components/people/PeopleTabHeader/PeopleTabHeader';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: BottomTabNavigatorStyle.tabBar
};

export const HomeTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: ({ focused }) => (
        <Text
            style={[
                BottomTabNavigatorStyle.tabLabel,
                // eslint-disable-next-line react-native/no-inline-styles
                { opacity: focused ? 1 : 0.7 }
            ]}
        >
            Home
        </Text>
    ),
    tabBarIcon: ({ focused }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ fontSize: focused ? 25 : 20 }}>🏠‍️</Text>
    )
};

export const HuddlesTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: ({ focused }) => (
        <Text
            style={[
                BottomTabNavigatorStyle.tabLabel,
                // eslint-disable-next-line react-native/no-inline-styles
                { opacity: focused ? 1 : 0.7 }
            ]}
        >
            Huddles
        </Text>
    ),
    tabBarIcon: ({ focused }) => (
        <Text
            style={[
                // eslint-disable-next-line react-native/no-inline-styles
                { fontSize: focused ? 24 : 20 },
                BottomTabNavigatorStyle.right
            ]}
        >
            👋
        </Text>
    )
};

export const ChatsTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: ({ focused }) => (
        <Text
            style={[
                BottomTabNavigatorStyle.tabLabel,
                // eslint-disable-next-line react-native/no-inline-styles
                { opacity: focused ? 1 : 0.7 }
            ]}
        >
            Chats
        </Text>
    ),
    tabBarIcon: ({ focused }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ fontSize: focused ? 24 : 19 }}>💬</Text>
    )
};

export const PeopleTabOptions: BottomTabNavigationOptions = {
    headerShown: true,
    header: () => <PeopleTabHeader />, // PeopleScreen is reused in nested Friends screen
    tabBarLabel: ({ focused }) => (
        <Text
            style={[
                BottomTabNavigatorStyle.tabLabel,
                // eslint-disable-next-line react-native/no-inline-styles
                { opacity: focused ? 1 : 0.7 }
            ]}
        >
            People
        </Text>
    ),
    tabBarIcon: ({ focused }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ fontSize: focused ? 24 : 20 }}>🚀</Text>
    )
};
