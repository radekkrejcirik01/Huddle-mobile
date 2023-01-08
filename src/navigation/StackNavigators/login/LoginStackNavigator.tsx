import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { LoginScreen } from '@screens/login/LoginScreen/LoginScreen';
import { RegistrationScreen } from '@screens/login/RegistrationScreen/RegistrationScreen';
import {
    ForNoAnimation,
    RegistrationScreenOptions
} from '@navigation/StackNavigators/login/LoginStackNavigator.options';
import {
    NavigatorScreenOptions,
    NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';

const Login = createStackNavigator<ParamListBase>();

export const LoginStackNavigator = (): JSX.Element => (
    <Login.Navigator screenOptions={NavigatorScreenOptions}>
        <Login.Screen
            name={LoginStackNavigatorEnum.LoginScreen}
            component={LoginScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.RegistrationScreen}
            component={RegistrationScreen}
            options={{
                ...RegistrationScreenOptions,
                ...ForNoAnimation
            }}
        />
    </Login.Navigator>
);
