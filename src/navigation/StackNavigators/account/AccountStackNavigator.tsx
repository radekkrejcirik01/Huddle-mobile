import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { NavigationScreenHeader } from '@navigation/StackNavigators/StackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { PeopleScreen } from '@screens/account/PeopleScreen/PeopleScreen';
import { PersonAccountScreen } from '@screens/account/PersonAccountScreen/PersonAccountScreen';
import { MessagesScreen } from '@screens/account/MessagesScreen/MessagesScreen';
import { ChatScreen } from '@screens/account/ChatScreen/ChatScreen';
import {
    ChatTitle,
    HangoutsTitle,
    MessagesTitle,
    NotificationsTitle,
    PeopleTitle,
    SettingsTitle
} from '@navigation/StackNavigators/account/AccountStackNavigator.options';

const Account = createStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): JSX.Element => (
    <Account.Navigator>
        <Account.Screen
            name={AccountStackNavigatorEnum.SettingsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...SettingsTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PeopleScreen}
            component={PeopleScreen}
            options={{ ...NavigationScreenHeader, ...PeopleTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PersonAccountScreen}
            component={PersonAccountScreen}
            options={NavigationScreenHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HangoutsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...HangoutsTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.NotificationsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...NotificationsTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.MessagesScreen}
            component={MessagesScreen}
            options={{ ...NavigationScreenHeader, ...MessagesTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ChatScreen}
            component={ChatScreen}
            options={{ ...NavigationScreenHeader, ...ChatTitle }}
        />
    </Account.Navigator>
);
