import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { NavigationScreenHeader } from '@navigation/StackNavigators/StackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { EventScreen } from '@screens/account/EventScreen/EventScreen';
import { HangoutsScreen } from '@screens/account/HangoutsScreen/HangoutsScreen';
import { ProfileScreen } from '@screens/account/ProfileScreen/ProfileScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { PeopleScreen } from '@screens/account/PeopleScreen/PeopleScreen';
import { PersonAccountScreen } from '@screens/account/PersonAccountScreen/PersonAccountScreen';
import { CreateGroupHangoutScreen } from '@screens/account/CreateGroupHangoutScreen/CreateGroupHangoutScreen';
import { PickPeopleScreen } from '@screens/account/PickPeopleScreen/PickPeopleScreen';
import { MessagesScreen } from '@screens/account/MessagesScreen/MessagesScreen';
import { ChatScreen } from '@screens/account/ChatScreen/ChatScreen';
import { ChatDetailScreen } from '@screens/account/ChatDetailScreen/ChatDetailScreen';
import { PictureScreen } from '@screens/account/PictureScreen/PictureScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { ChangePasswordScreen } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen';
import { DeleteAccountScreen } from '@screens/account/DeleteAccountScreen/DeleteAccountScreen';
import {
    AccountTitle,
    ChangePasswordTitle,
    ChatOptions,
    CreateGroupHangoutTitle,
    DeleteAccountTitle,
    EventTitle,
    HangoutsTitle,
    MessagesTitle,
    NotificationsTitle,
    PeopleOptions,
    PickPeopleTitle,
    PictureOptions,
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
            options={{ ...NavigationScreenHeader, ...PeopleOptions }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PersonAccountScreen}
            component={PersonAccountScreen}
            options={NavigationScreenHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.CreateGroupHangoutScreen}
            component={CreateGroupHangoutScreen}
            options={{ ...NavigationScreenHeader, ...CreateGroupHangoutTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PickPeopleScreen}
            component={PickPeopleScreen}
            options={{ ...NavigationScreenHeader, ...PickPeopleTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HangoutsScreen}
            component={HangoutsScreen}
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
            options={NavigationScreenHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ChatDetailScreen}
            component={ChatDetailScreen}
            options={{
                ...NavigationScreenHeader,
                ...ChatOptions
            }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.PictureScreen}
            component={PictureScreen}
            options={PictureOptions}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.EventScreen}
            component={EventScreen}
            options={{ ...NavigationScreenHeader, ...EventTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.AccountScreen}
            component={AccountScreen}
            options={{ ...NavigationScreenHeader, ...AccountTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ChangePasswordScreen}
            component={ChangePasswordScreen}
            options={{ ...NavigationScreenHeader, ...ChangePasswordTitle }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.DeleteAccountScreen}
            component={DeleteAccountScreen}
            options={{ ...NavigationScreenHeader, ...DeleteAccountTitle }}
        />
    </Account.Navigator>
);
