import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    NavigatorScreenOptions,
    NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { BottomTabNavigator } from '@navigation/BottomTabNavigator/BottomTabNavigator';
import { AccountStackNavigator } from '@navigation/StackNavigators/account/AccountStackNavigator';
import { LoginStackNavigator } from '@navigation/StackNavigators/login/LoginStackNavigator';

const Root = createStackNavigator<ParamListBase>();

export const RootStackNavigator = (): JSX.Element => {
    const token = true;

    if (token) {
        return (
            <Root.Navigator screenOptions={NavigatorScreenOptions}>
                <Root.Group>
                    <Root.Screen
                        name={RootStackNavigatorEnum.BottomTabBar}
                        component={BottomTabNavigator}
                        options={NoHeader}
                    />
                    <Root.Screen
                        name={RootStackNavigatorEnum.AccountStack}
                        component={AccountStackNavigator}
                        options={NoHeader}
                    />
                </Root.Group>
            </Root.Navigator>
        );
    }
    return (
        <Root.Navigator screenOptions={NavigatorScreenOptions}>
            <Root.Group>
                <Root.Screen
                    name={RootStackNavigatorEnum.LoginStack}
                    component={LoginStackNavigator}
                    options={NoHeader}
                />
            </Root.Group>
        </Root.Navigator>
    );
};
