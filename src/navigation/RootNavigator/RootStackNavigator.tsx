import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
    NavigatorScreenOptions,
    NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { BottomTabNavigator } from '@navigation/BottomTabNavigator/BottomTabNavigator';
import { AccountStackNavigator } from '@navigation/StackNavigators/account/AccountStackNavigator';
import { LoginStackNavigator } from '@navigation/StackNavigators/login/LoginStackNavigator';
import { ReducerProps } from '@store/index/index.props';
import { GetStartedScreen } from '@screens/getStarted/GetStartedScreen/GetStartedScreen';

const Root = createStackNavigator<ParamListBase>();

export const RootStackNavigator = (): JSX.Element => {
    const { getStarted } = useSelector(
        (state: ReducerProps) => state.getStarted
    );
    const { token } = useSelector((state: ReducerProps) => state.user);

    if (getStarted) {
        return (
            <Root.Navigator screenOptions={NavigatorScreenOptions}>
                <Root.Screen
                    name={RootStackNavigatorEnum.GetStartedStack}
                    component={GetStartedScreen}
                    options={NoHeader}
                />
            </Root.Navigator>
        );
    }

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
        <Root.Navigator>
            <Root.Screen
                name={RootStackNavigatorEnum.LoginStack}
                component={LoginStackNavigator}
                options={NoHeader}
            />
        </Root.Navigator>
    );
};
