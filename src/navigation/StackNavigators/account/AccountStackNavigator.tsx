import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
    NavigationScreenHeader,
    NoTitle
} from '@navigation/StackNavigators/StackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { FriendsScreen } from '@screens/account/FriendsScreen/FriendsScreen';
import { ProfilePhotoScreen } from '@screens/account/ProfilePhotoScreen/ProfilePhotoScreen';
import { ConversationScreen } from '@screens/account/ConversationScreen/ConversationScreen';
import { ConversationDetailsScreen } from '@screens/account/ConversationDetailsScreen/ConversationDetailsScreen';
import { HuddleScreen } from '@screens/account/HuddleScreen/HuddleScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { SettingsScreen } from '@screens/account/SettingsScreen/SettingsScreen';
import { PrivacyScreen } from '@screens/account/PrivacyScreen/PrivacyScreen';
import { ShowHuddlesScreen } from '@screens/account/ShowHuddlesScreen/ShowHuddlesScreen';
import { ManageAccountScreen } from '@screens/account/ManageAccountScreen/ManageAccountScreen';
import { MutedHuddlesScreen } from '@screens/account/MutedHuddlesScreen/MutedHuddlesScreen';
import { InvitesScreen } from '@screens/account/InvitesScreen/InvitesScreen';
import {
    AccountTitle,
    FriendsOptions,
    InvitesTitle,
    ManageAccountTitle,
    MutedTitle,
    NotificationsTitle,
    PrivacyTitle,
    SettingsTitle,
    ShowTitle
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
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ConversationDetailsScreen}
            component={ConversationDetailsScreen}
            options={{ ...NavigationScreenHeader }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.FriendsScreen}
            component={FriendsScreen}
            options={{ ...NavigationScreenHeader, ...FriendsOptions }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ShowHuddlesScreen}
            component={ShowHuddlesScreen}
            options={{ ...NavigationScreenHeader, ...ShowTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HuddleScreen}
            component={HuddleScreen}
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.InvitesScreen}
            component={InvitesScreen}
            options={{ ...NavigationScreenHeader, ...InvitesTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ManageAccountScreen}
            component={ManageAccountScreen}
            options={{ ...NavigationScreenHeader, ...ManageAccountTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.MutedHuddlesScreen}
            component={MutedHuddlesScreen}
            options={{ ...NavigationScreenHeader, ...MutedTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.NotificationsScreen}
            component={NotificationsScreen}
            options={{ ...NavigationScreenHeader, ...NotificationsTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PrivacyScreen}
            component={PrivacyScreen}
            options={{ ...NavigationScreenHeader, ...PrivacyTitle }}
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
