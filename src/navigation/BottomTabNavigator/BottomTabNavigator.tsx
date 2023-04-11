import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';
import { HuddlesScreen } from '@screens/account/HuddlesScreen/HuddlesScreen';
import { ChatsScreen } from '@screens/account/ChatsScreen/ChatsScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { PeopleScreen } from '@screens/account/PeopleScreen/PeopleScreen';
import {
    BottomTabNavigatorOptions,
    ChatsTabOptions,
    HomeTabOptions,
    HuddlesTabOptions,
    NotificationsTabOptions,
    PeopleTabOptions
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
                name={BottomTabNavigatorEnum.HuddlesTab}
                component={HuddlesScreen}
                options={HuddlesTabOptions}
            />
            <TabBar.Screen
                name={BottomTabNavigatorEnum.NotificationsTab}
                component={NotificationsScreen}
                options={NotificationsTabOptions}
            />
            <TabBar.Screen
                name={BottomTabNavigatorEnum.PeopleTab}
                component={PeopleScreen}
                options={PeopleTabOptions}
            />
        </TabBar.Navigator>
    );
};
