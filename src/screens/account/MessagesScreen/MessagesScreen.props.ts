import { Moment } from 'moment';

export interface MessagesListDataProps {
    username: string;
    firstname: string;
    profilePicture: string;
    message: string;
    time: Moment;
    isRead: number;
}
