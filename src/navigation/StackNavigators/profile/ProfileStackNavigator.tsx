import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { NavigationScreenHeader } from '@navigation/StackNavigators/StackNavigator.options';
import { ProfileStackNavigatorEnum } from '@navigation/StackNavigators/profile/ProfileStackNavigator.enum';
import { NotificationsScreen } from '@screens/profile/messages/NotificationsScreen/NotificationsScreen';
import { MessagesScreen } from '@screens/profile/messages/MessagesScreen/MessagesScreen';
import { ChatScreen } from '@screens/profile/messages/ChatScreen/ChatScreen';
import {
    ChatTitle,
    HangoutsTitle,
    MessagesTitle,
    NotificationsTitle,
    PeopleTitle,
    SettingsTitle
} from '@navigation/StackNavigators/profile/ProfileStackNavigator.options';

const Profile = createStackNavigator<ParamListBase>();

export const ProfileStackNavigator = (): JSX.Element => (
    <Profile.Navigator>
        <Profile.Screen
            name={ProfileStackNavigatorEnum.SettingsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...SettingsTitle }}
        />
        <Profile.Screen
            name={ProfileStackNavigatorEnum.PeopleScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...PeopleTitle }}
        />
        <Profile.Screen
            name={ProfileStackNavigatorEnum.HangoutsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...HangoutsTitle }}
        />
        <Profile.Screen
            name={ProfileStackNavigatorEnum.NotificationsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...NotificationsTitle }}
        />
        <Profile.Screen
            name={ProfileStackNavigatorEnum.MessagesScreen}
            component={MessagesScreen}
            options={{ ...NavigationScreenHeader, ...MessagesTitle }}
        />
        <Profile.Screen
            name={ProfileStackNavigatorEnum.ChatScreen}
            component={ChatScreen}
            options={{ ...NavigationScreenHeader, ...ChatTitle }}
        />
    </Profile.Navigator>
);
