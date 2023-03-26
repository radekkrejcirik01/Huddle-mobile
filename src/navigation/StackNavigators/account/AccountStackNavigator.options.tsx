import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { FriendsPlus } from '@components/general/FriendsPlus/FriendsPlus';

export const AddConversationPeopleTitle: StackNavigationOptions = {
    headerTitle: 'Add people'
};

export const AddHangoutInvitationsTitle: StackNavigationOptions = {
    headerTitle: 'Add people'
};

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

export const HangoutsHistoryTitle: StackNavigationOptions = {
    headerTitle: 'Hangouts history'
};

export const NotificationsTitle: StackNavigationOptions = {
    headerTitle: 'Notifications'
};

export const HangoutDetailsTitle: StackNavigationOptions = {
    headerTitle: 'Edit'
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

export const SelectGroupHangoutUsersTitle: StackNavigationOptions = {
    headerTitle: 'Add people'
};
