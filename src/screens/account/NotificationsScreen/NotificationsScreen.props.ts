import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export interface NotificationsListProps extends NotificationPeopleProps {
    id: number;
    profilePicture: string;
    username: string;
    type: NotificationTypeEnum;
    time: string;
}

export interface NotificationPeopleProps {
    accepted?: number;
}
