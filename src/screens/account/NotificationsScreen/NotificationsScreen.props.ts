import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export interface NotificationsListProps {
    id: number;
    sender: string;
    senderName: string;
    profilePicture: string;
    type: NotificationTypeEnum;
    accepted?: number;
    created: string;
}
