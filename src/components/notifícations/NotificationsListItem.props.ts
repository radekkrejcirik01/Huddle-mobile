import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

export interface NotificationsListItemProps {
    item: NotificationsListProps;
    onAcceptInvite: (item: NotificationsListProps) => void;
    onOpenAccount: (item: NotificationsListProps, accepted: boolean) => void;
    onOpenHangout: (item: NotificationsListProps) => void;
}
