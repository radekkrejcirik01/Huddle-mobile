import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { AddContactButton } from '@components/contacts/AddContactButton/AddContactButton';
import { AccountStackNavigatorStyle } from '@navigation/StackNavigators/account/AccountStackNavigator.style';

export const AccountTitle: StackNavigationOptions = {
    headerTitle: 'Account'
};

export const ContactsOptions: StackNavigationOptions = {
    headerTitle: 'Friends',
    headerRight: () => <AddContactButton />,
    headerStyle: AccountStackNavigatorStyle.header
};

export const ManageAccountTitle: StackNavigationOptions = {
    headerTitle: 'Manage account'
};

export const NotificationsTitle: StackNavigationOptions = {
    headerTitle: 'Notifications'
};

export const PrivacyTitle: StackNavigationOptions = {
    headerTitle: 'Privacy'
};

export const SettingsTitle: StackNavigationOptions = {
    headerTitle: 'Settings'
};
