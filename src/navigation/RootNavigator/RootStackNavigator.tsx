import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    NavigatorScreenOptions,
    NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { BottomTabNavigator } from '@navigation/BottomTabNavigator/BottomTabNavigator';
import { MessagesStackNavigator } from '@navigation/StackNavigators/messages/MessagesStackNavigator';
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
                        name={RootStackNavigatorEnum.MessagesStack}
                        component={MessagesStackNavigator}
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
                    name={RootStackNavigatorEnum.RegistrationStack}
                    component={LoginStackNavigator}
                    options={NoHeader}
                />
            </Root.Group>
        </Root.Navigator>
    );
};
