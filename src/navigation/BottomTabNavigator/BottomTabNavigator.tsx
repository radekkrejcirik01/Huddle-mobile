import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import { ChatsScreen } from '@screens/account/ChatsScreen/ChatsScreen';
import {
    BottomTabNavigatorOptions,
    ChatsTabOptions
} from '@navigation/BottomTabNavigator/BottomTabNavigator.options';

export const BottomTabNavigator = (): JSX.Element => {
    const TabBar = createBottomTabNavigator();

    return (
        <TabBar.Navigator
            screenOptions={BottomTabNavigatorOptions}
            initialRouteName={BottomTabNavigatorEnum.ChatsTab}
        >
            <TabBar.Screen
                name={BottomTabNavigatorEnum.ChatsTab}
                component={ChatsScreen}
                options={ChatsTabOptions}
            />
        </TabBar.Navigator>
    );
};
