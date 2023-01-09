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
    headerTitle: 'Hangouts'
};

export const NotificationsTitle: StackNavigationOptions = {
    headerTitle: 'Notifications'
};

export const MessagesTitle: StackNavigationOptions = {
    headerTitle: 'Messages'
};

export const ChatTitle: StackNavigationOptions = {
    headerTitle: 'Chat'
};

export const EventTitle: StackNavigationOptions = {
    headerTitle: 'Details'
};
