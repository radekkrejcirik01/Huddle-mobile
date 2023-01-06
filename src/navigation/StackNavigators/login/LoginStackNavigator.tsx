import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { LoginScreen } from '@screens/login/LoginScreen/LoginScreen';
import { RegistrationScreen } from '@screens/login/RegistrationScreen/RegistrationScreen';
import {
    ForFade,
    ForNoAnimation,
    LoginScreenOptions
} from '@navigation/StackNavigators/login/LoginStackNavigator.options';

const Login = createStackNavigator<ParamListBase>();

export const LoginStackNavigator = (): JSX.Element => (
    <Login.Navigator>
        <Login.Screen
            name={LoginStackNavigatorEnum.LoginScreen}
            component={LoginScreen}
            options={{ ...LoginScreenOptions, ...ForFade }}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.RegistrationScreen}
            component={RegistrationScreen}
            options={{
                ...LoginScreenOptions,
                ...ForNoAnimation
            }}
        />
    </Login.Navigator>
);
