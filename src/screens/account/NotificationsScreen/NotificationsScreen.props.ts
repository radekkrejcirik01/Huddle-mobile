import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export interface NotificationsListProps {
    id: number;
    huddleId?: number;
    sender: string;
    senderName: string;
    profilePhoto: string;
    type: NotificationTypeEnum;
    what?: string;
    accepted?: number;
    confirmed?: number;
    created: string;
}
