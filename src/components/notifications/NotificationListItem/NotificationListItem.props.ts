import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

export interface NotificationListItemProps {
    listItem: NotificationsListProps;
    onOpenAccount: () => void;
    onAcceptPersonInvite: () => void;
    onOpenChat: () => void;
    onOpenHuddle: () => void;
    onConfirmHuddle: () => void;
}
