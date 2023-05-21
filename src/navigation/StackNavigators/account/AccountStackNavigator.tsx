import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
    NavigationScreenHeader,
    NoTitle
} from '@navigation/StackNavigators/StackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { EditProfileScreen } from '@screens/account/EditProfileScreen/EditProfileScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { FriendsScreen } from '@screens/account/FriendsScreen/FriendsScreen';
import { ProfilePhotoScreen } from '@screens/account/ProfilePhotoScreen/ProfilePhotoScreen';
import { ConversationScreen } from '@screens/account/ConversationScreen/ConversationScreen';
import { HuddleScreen } from '@screens/account/HuddleScreen/HuddleScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { ChangePasswordScreen } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen';
import { DeleteAccountScreen } from '@screens/account/DeleteAccountScreen/DeleteAccountScreen';
import { SettingsScreen } from '@screens/account/SettingsScreen/SettingsScreen';
import {
    AccountTitle,
    ChangePasswordTitle,
    DeleteAccountTitle,
    EditProfileTitle,
    FriendsOptions,
    NotificationsTitle,
    SettingsTitle
} from '@navigation/StackNavigators/account/AccountStackNavigator.options';
import { NavigatorScreenOptions } from '@navigation/RootNavigator/RootStackNavigator.options';

const Account = createStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): JSX.Element => (
    <Account.Navigator screenOptions={NavigatorScreenOptions}>
        <Account.Screen
            name={AccountStackNavigatorEnum.AccountScreen}
            component={AccountScreen}
            options={{ ...NavigationScreenHeader, ...AccountTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ConversationScreen}
            component={ConversationScreen}
            options={{ ...NavigationScreenHeader }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.DeleteAccountScreen}
            component={DeleteAccountScreen}
            options={{ ...NavigationScreenHeader, ...DeleteAccountTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.EditProfileScreen}
            component={EditProfileScreen}
            options={{ ...NavigationScreenHeader, ...EditProfileTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.FriendsScreen}
            component={FriendsScreen}
            options={{ ...NavigationScreenHeader, ...FriendsOptions }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HuddleScreen}
            component={HuddleScreen}
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ChangePasswordScreen}
            component={ChangePasswordScreen}
            options={{ ...NavigationScreenHeader, ...ChangePasswordTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.NotificationsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...NotificationsTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ProfilePhotoScreen}
            component={ProfilePhotoScreen}
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.SettingsScreen}
            component={SettingsScreen}
            options={{ ...NavigationScreenHeader, ...SettingsTitle }}
        />
    </Account.Navigator>
);
