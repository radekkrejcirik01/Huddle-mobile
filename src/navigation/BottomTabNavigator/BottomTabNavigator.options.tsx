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
    title: null,
    tabBarShowLabel: false
};

export const ProfileTabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ fontSize: focused ? 25 : 22 }}>🙎‍♂️</Text>
    )
};

export const HuddlesTabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
        <Text
            style={[
                // eslint-disable-next-line react-native/no-inline-styles
                { fontSize: focused ? 25 : 22 },
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
    tabBarIcon: ({ focused }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text
            style={{
                fontSize: focused ? 25 : 22,
                letterSpacing: focused ? -14 : -12
            }}
        >
            🧍‍♀️🧍‍♂️
        </Text>
    )
};
