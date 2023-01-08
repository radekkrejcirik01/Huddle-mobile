import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';
import { PeopleScreen } from '@screens/account/PeopleScreen/PeopleScreen';
import {
    BottomTabNavigatorOptions,
    HomeTabOptions,
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
                name={BottomTabNavigatorEnum.PeopleTab}
                component={PeopleScreen}
                options={PeopleTabOptions}
            />
            <TabBar.Screen
                name={BottomTabNavigatorEnum.HomeTab}
                component={HomeScreen}
                options={HomeTabOptions}
            />
        </TabBar.Navigator>
    );
};
