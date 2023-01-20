import { Moment } from 'moment';

export interface MessagesListDataProps {
    id: number;
    name: string;
    picture: string;
    message: string;
    time: Moment;
    isRead: number;
}
