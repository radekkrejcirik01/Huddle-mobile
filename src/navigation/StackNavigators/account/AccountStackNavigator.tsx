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
import { ConversationDetailsScreen } from '@screens/account/ConversationDetailsScreen/ConversationDetailsScreen';
import { HuddleScreen } from '@screens/account/HuddleScreen/HuddleScreen';
import { PictureScreen } from '@screens/account/PictureScreen/PictureScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { ChangePasswordScreen } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen';
import { DeleteAccountScreen } from '@screens/account/DeleteAccountScreen/DeleteAccountScreen';
import {
    AccountTitle,
    ChangePasswordTitle,
    ConversationDetailsOptions,
    DeleteAccountTitle,
    FriendsOptions,
    NotificationsTitle,
    ProfileTitle
} from '@navigation/StackNavigators/account/AccountStackNavigator.options';

const Account = createStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): JSX.Element => (
    <Account.Navigator>
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
            options={{
                ...NavigationScreenHeader,
                ...ConversationDetailsOptions
            }}
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
            name={AccountStackNavigatorEnum.ProfilePhotoScreen}
            component={ProfilePhotoScreen}
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PeopleScreen}
            component={PeopleScreen}
            options={{ ...NavigationScreenHeader, ...FriendsOptions }}
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
            name={AccountStackNavigatorEnum.ProfileDetailScreen}
            component={ProfileDetailsScreen}
            options={{ ...NavigationScreenHeader, ...ProfileTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PictureScreen}
            component={PictureScreen}
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
    </Account.Navigator>
);
