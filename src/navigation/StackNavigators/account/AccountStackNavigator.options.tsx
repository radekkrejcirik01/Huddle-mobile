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

export const HideFromTitle: StackNavigationOptions = {
    headerTitle: 'Hide from'
};

export const ChangePasswordTitle: StackNavigationOptions = {
    headerTitle: 'Change password'
};

export const InvitesTitle: StackNavigationOptions = {
    headerTitle: 'Invites'
};

export const MutedTitle: StackNavigationOptions = {
    headerTitle: 'Muted'
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
