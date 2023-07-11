import React from 'react';
import { Text } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import COLORS from '@constants/COLORS';
import { AddChats } from '@components/chats/AddChats/AddChats';
import { AddFriends } from '@components/friends/AddFriends/AddFriends';
import { ChatsTabIcon } from '@components/chats/ChatsTabIcon/ChatsTabIcon';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerTintColor: COLORS.WHITE,
    headerStyle: BottomTabNavigatorStyle.header,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    title: null
};

export const ProfileTabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarLabel: ({ focused }) => (
        <Text
            style={[
                BottomTabNavigatorStyle.tabLabel,
                // eslint-disable-next-line react-native/no-inline-styles
                { opacity: focused ? 1 : 0.7 }
            ]}
        >
            Profile
        </Text>
    ),
    tabBarIcon: ({ focused }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ fontSize: focused ? 25 : 20 }}>🙎‍♂️</Text>
    )
};

export const HuddlesTabOptions: BottomTabNavigationOptions = {
    headerShown: false,
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
    headerLeft: () => <AddChats />,
    headerRight: () => (
        <Text style={BottomTabNavigatorStyle.rightTitleText}>chats</Text>
    ),
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
        <ChatsTabIcon focused={focused} />
    )
};

export const FriendsTabOptions: BottomTabNavigationOptions = {
    headerLeft: () => <AddFriends />,
    headerRight: () => (
        <Text style={BottomTabNavigatorStyle.rightTitleText}>friends</Text>
    ),
    tabBarLabel: ({ focused }) => (
        <Text
            style={[
                BottomTabNavigatorStyle.tabLabel,
                // eslint-disable-next-line react-native/no-inline-styles
                { opacity: focused ? 1 : 0.7 }
            ]}
        >
            Friends
        </Text>
    ),
    tabBarIcon: ({ focused }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text
            style={{
                fontSize: focused ? 24 : 20,
                letterSpacing: focused ? -14 : -12
            }}
        >
            🧍‍♂️🧍‍♀️
        </Text>
    )
};
