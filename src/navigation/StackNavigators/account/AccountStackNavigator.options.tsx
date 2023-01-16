import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { HeaderPlus } from '@components/general/HeaderPlus/HeaderPlus';

export const ProfileTitle: StackNavigationOptions = {
    headerTitle: 'Profile'
};

export const PeopleOptions: StackNavigationOptions = {
    headerTitle: 'People',
    headerRight: () => <HeaderPlus />
};

export const HangoutsTitle: StackNavigationOptions = {
    headerTitle: 'History'
};

export const NotificationsTitle: StackNavigationOptions = {
    headerTitle: 'Notifications'
};

export const MessagesTitle: StackNavigationOptions = {
    headerTitle: 'Messages'
};

export const EventTitle: StackNavigationOptions = {
    headerTitle: 'Details'
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

export const CreateGroupHangoutTitle: StackNavigationOptions = {
    headerTitle: 'Group hangout'
};
