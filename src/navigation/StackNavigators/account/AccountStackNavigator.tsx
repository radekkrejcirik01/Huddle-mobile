import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
    NavigationScreenHeader,
    NoTitle
} from '@navigation/StackNavigators/StackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { AddConversationPeopleScreen } from '@screens/account/AddConversationPeopleScreen/AddConversationPeopleScreen';
import { AddHangoutInvitationsScreen } from '@screens/account/AddHangoutInvitationsScreen/AddHangoutInvitationsScreen';
import { HangoutScreen } from '@screens/account/HangoutScreen/HangoutScreen';
import { HangoutsHistoryScreen } from '@screens/account/HangoutsHistoryScreen/HangoutsHistoryScreen';
import { ProfileScreen } from '@screens/account/ProfileScreen/ProfileScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { PeopleScreen } from '@screens/account/PeopleScreen/PeopleScreen';
import { PersonProfileScreen } from '@screens/account/PersonProfileScreen/PersonProfileScreen';
import { CreateGroupHangoutScreen } from '@screens/account/CreateGroupHangoutScreen/CreateGroupHangoutScreen';
import { ConversationScreen } from '@screens/account/ConversationScreen/ConversationScreen';
import { ConversationDetailsScreen } from '@screens/account/ConversationDetailsScreen/ConversationDetailsScreen';
import { PictureScreen } from '@screens/account/PictureScreen/PictureScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { ChangePasswordScreen } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen';
import { DeleteAccountScreen } from '@screens/account/DeleteAccountScreen/DeleteAccountScreen';
import { HangoutDetailsScreen } from '@screens/account/HangoutDetailsScreen/HangoutDetailsScreen';
import { SelectGroupHangoutUsersScreen } from '@screens/account/SelectGroupHangoutUsersScreen/SelectGroupHangoutUsersScreen';
import {
    AccountTitle,
    AddConversationPeopleTitle,
    AddHangoutInvitationsTitle,
    ChangePasswordTitle,
    ConversationDetailsOptions,
    CreateGroupHangoutTitle,
    DeleteAccountTitle,
    FriendsOptions,
    HangoutDetailsTitle,
    HangoutsHistoryTitle,
    NotificationsTitle,
    ProfileTitle,
    SelectGroupHangoutUsersTitle
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
            name={AccountStackNavigatorEnum.AddConversationPeopleScreen}
            component={AddConversationPeopleScreen}
            options={{
                ...NavigationScreenHeader,
                ...AddConversationPeopleTitle
            }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.AddHangoutInvitationsScreen}
            component={AddHangoutInvitationsScreen}
            options={{
                ...NavigationScreenHeader,
                ...AddHangoutInvitationsTitle
            }}
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
            name={AccountStackNavigatorEnum.CreateGroupHangoutScreen}
            component={CreateGroupHangoutScreen}
            options={{ ...NavigationScreenHeader, ...CreateGroupHangoutTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.DeleteAccountScreen}
            component={DeleteAccountScreen}
            options={{ ...NavigationScreenHeader, ...DeleteAccountTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PersonProfileScreen}
            component={PersonProfileScreen}
            options={NavigationScreenHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PeopleScreen}
            component={PeopleScreen}
            options={{ ...NavigationScreenHeader, ...FriendsOptions }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HangoutDetailsScreen}
            component={HangoutDetailsScreen}
            options={{ ...NavigationScreenHeader, ...HangoutDetailsTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HangoutScreen}
            component={HangoutScreen}
            options={NavigationScreenHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HangoutsHistoryScreen}
            component={HangoutsHistoryScreen}
            options={{ ...NavigationScreenHeader, ...HangoutsHistoryTitle }}
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
            name={AccountStackNavigatorEnum.ProfileScreen}
            component={ProfileScreen}
            options={{ ...NavigationScreenHeader, ...ProfileTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PictureScreen}
            component={PictureScreen}
            options={{ ...NavigationScreenHeader, ...NoTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.SelectGroupHangoutUsersScreen}
            component={SelectGroupHangoutUsersScreen}
            options={{
                ...NavigationScreenHeader,
                ...SelectGroupHangoutUsersTitle
            }}
        />
    </Account.Navigator>
);
