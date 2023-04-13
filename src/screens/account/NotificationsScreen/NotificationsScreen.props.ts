import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export interface NotificationsListProps {
    id: number;
    sender: string;
    senderName: string;
    created: string;
    profilePicture: string;
    confirmed?: number;
    type: NotificationTypeEnum;
}
