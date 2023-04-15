import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

export interface NotificationListItemProps {
    listItem: NotificationsListProps;
    onOpenAccount: (item: NotificationsListProps) => void;
    onAcceptPersonInvite: (item: NotificationsListProps) => void;
    onOpenChat: (item: NotificationsListProps) => void;
    onOpenHuddle: (item: NotificationsListProps) => void;
}
