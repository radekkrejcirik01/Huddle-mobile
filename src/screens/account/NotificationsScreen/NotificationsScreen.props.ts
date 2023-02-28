import { Moment } from 'moment';
import { NotificationTypeEnum } from '@enums/notifications/NotificationType.enum';

export interface NotificationsListProps {
    id: number;
    name: string;
    username: string;
    profilePicture: string;
    confirmed: number;
    time: Moment;
    type: NotificationTypeEnum;
}
