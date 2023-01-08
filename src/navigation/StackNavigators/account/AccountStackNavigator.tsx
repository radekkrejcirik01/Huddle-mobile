import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { NavigationScreenHeader } from '@navigation/StackNavigators/StackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { EventScreen } from '@screens/account/EventScreen/EventScreen';
import { HangoutScreen } from '@screens/account/HangoutScreen/HangoutScreen';
import { ProfileScreen } from '@screens/account/PrfofileScreen/ProfileScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { PeopleScreen } from '@screens/account/PeopleScreen/PeopleScreen';
import { PersonAccountScreen } from '@screens/account/PersonAccountScreen/PersonAccountScreen';
import { MessagesScreen } from '@screens/account/MessagesScreen/MessagesScreen';
import { ChatScreen } from '@screens/account/ChatScreen/ChatScreen';
import {
    ChatTitle,
    EventTitle,
    HangoutsTitle,
    MessagesTitle,
    NotificationsTitle,
    PeopleTitle,
    ProfileTitle
} from '@navigation/StackNavigators/account/AccountStackNavigator.options';

const Account = createStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): JSX.Element => (
    <Account.Navigator>
        <Account.Screen
            name={AccountStackNavigatorEnum.ProfileScreen}
            component={ProfileScreen}
            options={{ ...NavigationScreenHeader, ...ProfileTitle }}
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
            component={HangoutScreen}
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
        <Account.Screen
            name={AccountStackNavigatorEnum.EventScreen}
            component={EventScreen}
            options={{ ...NavigationScreenHeader, ...EventTitle }}
        />
    </Account.Navigator>
);
