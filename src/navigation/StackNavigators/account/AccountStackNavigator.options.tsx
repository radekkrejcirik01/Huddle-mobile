import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { PeoplePlus } from '@components/people/PeoplePlus/PeoplePlus';

export const ProfileTitle: StackNavigationOptions = {
    headerTitle: 'Profile'
};

export const FriendsOptions: StackNavigationOptions = {
    headerTitle: 'People',
    headerRight: () => <PeoplePlus />
};

export const ConversationDetailsOptions: StackNavigationOptions = {
    title: 'Details'
};

export const NotificationsTitle: StackNavigationOptions = {
    headerTitle: 'Notifications'
};

export const AccountTitle: StackNavigationOptions = {
    headerTitle: 'Account'
};

export const ChangePasswordTitle: StackNavigationOptions = {
    headerTitle: 'Change password'
};

export const DeleteAccountTitle: StackNavigationOptions = {
    headerTitle: 'Delete account'
};
