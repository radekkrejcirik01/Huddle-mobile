import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { FriendsPlus } from '@components/general/FriendsPlus/FriendsPlus';

export const ProfileTitle: StackNavigationOptions = {
    headerTitle: 'Profile'
};

export const FriendsOptions: StackNavigationOptions = {
    headerTitle: 'Friends',
    headerRight: () => <FriendsPlus />
};

export const ConversationDetailsOptions: StackNavigationOptions = {
    title: 'Details'
};

export const HuddlesHistoryTitle: StackNavigationOptions = {
    headerTitle: 'Huddles history'
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
