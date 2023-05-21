import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { AddFriend } from '@components/friends/AddFriend/AddFriend';

export const AccountTitle: StackNavigationOptions = {
    headerTitle: 'Account'
};
export const DeleteAccountTitle: StackNavigationOptions = {
    headerTitle: 'Delete account'
};

export const EditProfileTitle: StackNavigationOptions = {
    headerTitle: 'Edit profile'
};

export const FriendsOptions: StackNavigationOptions = {
    headerTitle: 'Friends 👨‍👩‍👧‍👦',
    headerRight: () => <AddFriend />
};

export const ChangePasswordTitle: StackNavigationOptions = {
    headerTitle: 'Change password'
};

export const NotificationsTitle: StackNavigationOptions = {
    headerTitle: 'Notifications'
};

export const SettingsTitle: StackNavigationOptions = {
    headerTitle: 'Settings'
};
