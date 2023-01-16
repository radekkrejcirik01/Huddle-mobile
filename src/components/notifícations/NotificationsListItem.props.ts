import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';

export interface NotificationsListItemProps {
    item: NotificationsListProps;
    onAccept: (item: NotificationsListProps) => void;
    onItemPress: (item: NotificationsListProps) => void;
}
