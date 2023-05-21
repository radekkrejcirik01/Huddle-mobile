import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { AddFriend } from '@components/friends/AddFriend/AddFriend';

export const ProfileTitle: StackNavigationOptions = {
    headerTitle: 'Profile'
};

export const FriendsOptions: StackNavigationOptions = {
    headerTitle: 'Friends 👨‍👩‍👧‍👦',
    headerRight: () => <AddFriend />
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
