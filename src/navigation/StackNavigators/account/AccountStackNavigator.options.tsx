import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { AddFriends } from '@components/friends/AddFriends/AddFriends';

export const AccountTitle: StackNavigationOptions = {
    headerTitle: 'Account'
};

export const FriendsOptions: StackNavigationOptions = {
    headerTitle: 'Friends',
    headerRight: () => <AddFriends />
};

export const ShowTitle: StackNavigationOptions = {
    headerTitle: 'Show'
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
