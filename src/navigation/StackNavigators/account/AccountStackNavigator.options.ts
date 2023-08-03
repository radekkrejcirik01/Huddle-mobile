import { StackNavigationOptions } from '@react-navigation/stack';
import store from '@store/index/index';

export const AccountTitle: StackNavigationOptions = {
    headerTitle: 'Account'
};

export const FriendsOptions: StackNavigationOptions = {
    headerTitle: 'Contacts'
};

export const ShowTitle: StackNavigationOptions = {
    headerTitle: 'Show'
};

export const ManageAccountTitle: StackNavigationOptions = {
    headerTitle: 'Manage account'
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
    headerTitle: store.getState().user.user.username
};