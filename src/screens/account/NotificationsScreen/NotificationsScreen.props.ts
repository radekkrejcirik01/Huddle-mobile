import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export interface NotificationsListProps {
    id: number;
    username: string;
    profilePicture: string;
    confirmed: number;
    time: string;
    type: NotificationTypeEnum;
}
