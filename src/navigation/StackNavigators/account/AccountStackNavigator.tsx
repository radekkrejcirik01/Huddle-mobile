import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
    NavigationScreenHeader,
    NoTitle
} from '@navigation/StackNavigators/StackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileDetailsScreen } from '@screens/account/ProfileDetailsScreen/ProfileDetailsScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { PeopleScreen } from '@screens/account/PeopleScreen/PeopleScreen';
import { ProfilePhotoScreen } from '@screens/account/ProfilePhotoScreen/ProfilePhotoScreen';
import { ConversationScreen } from '@screens/account/ConversationScreen/ConversationScreen';
import { HuddleScreen } from '@screens/account/HuddleScreen/HuddleScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { ChangePasswordScreen } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen';
import { DeleteAccountScreen } from '@screens/account/DeleteAccountScreen/DeleteAccountScreen';
import {
    AccountTitle,
    ChangePasswordTitle,
    DeleteAccountTitle,
    NotificationsTitle,
    PeopleOptions,
    ProfileTitle
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
            name={AccountStackNavigatorEnum.PeopleScreen}
            component={PeopleScreen}
            options={{ ...NavigationScreenHeader, ...PeopleOptions }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ProfileDetailScreen}
            component={ProfileDetailsScreen}
            options={{ ...NavigationScreenHeader, ...ProfileTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ProfilePhotoScreen}
            component={ProfilePhotoScreen}
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
    </Account.Navigator>
);
