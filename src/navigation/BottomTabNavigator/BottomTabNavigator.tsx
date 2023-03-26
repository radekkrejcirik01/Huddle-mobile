import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';
import { ChatsScreen } from '@screens/account/ChatsScreen/ChatsScreen';
import { FriendsScreen } from '@screens/account/FriendsScreen/FriendsScreen';
import {
    BottomTabNavigatorOptions,
    ChatsTabOptions,
    FriendsTabOptions,
    HomeTabOptions
} from '@navigation/BottomTabNavigator/BottomTabNavigator.options';

export const BottomTabNavigator = (): JSX.Element => {
    const TabBar = createBottomTabNavigator();

    return (
        <TabBar.Navigator
            initialRouteName={BottomTabNavigatorEnum.HomeTab}
            screenOptions={BottomTabNavigatorOptions}
        >
            <TabBar.Screen
                name={BottomTabNavigatorEnum.HomeTab}
                component={HomeScreen}
                options={HomeTabOptions}
            />
            <TabBar.Screen
                name={BottomTabNavigatorEnum.ChatsTab}
                component={ChatsScreen}
                options={ChatsTabOptions}
            />
            <TabBar.Screen
                name={BottomTabNavigatorEnum.FriendsTab}
                component={FriendsScreen}
                options={FriendsTabOptions}
            />
        </TabBar.Navigator>
    );
};
