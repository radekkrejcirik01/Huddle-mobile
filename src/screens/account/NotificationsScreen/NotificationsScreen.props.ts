import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export interface NotificationsListProps {
    id: number;
    eventId: number;
    sender: string;
    senderName: string;
    profilePhoto?: string;
    type: NotificationTypeEnum;
    what?: string;
    accepted?: number;
    confirmed?: number;
    comment?: string;
    created: string;
}
