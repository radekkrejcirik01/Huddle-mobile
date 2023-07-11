import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import { ProfileScreen } from '@screens/account/ProfileScreen/ProfileScreen';
import { HuddlesScreen } from '@screens/account/HuddlesScreen/HuddlesScreen';
import { ChatsScreen } from '@screens/account/ChatsScreen/ChatsScreen';
import { FriendsScreen } from '@screens/account/FriendsScreen/FriendsScreen';
import {
    BottomTabNavigatorOptions,
    ChatsTabOptions,
    FriendsTabOptions,
    HuddlesTabOptions,
    ProfileTabOptions
} from '@navigation/BottomTabNavigator/BottomTabNavigator.options';

export const BottomTabNavigator = (): JSX.Element => {
    const TabBar = createBottomTabNavigator();

    return (
        <TabBar.Navigator
            screenOptions={BottomTabNavigatorOptions}
            initialRouteName={BottomTabNavigatorEnum.HuddlesTab}
        >
            <TabBar.Screen
                name={BottomTabNavigatorEnum.ProfileTab}
                component={ProfileScreen}
                options={ProfileTabOptions}
            />
            <TabBar.Screen
                name={BottomTabNavigatorEnum.HuddlesTab}
                component={HuddlesScreen}
                options={HuddlesTabOptions}
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
