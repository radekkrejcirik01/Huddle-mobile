import { Moment } from 'moment';

export interface MessagesListDataProps {
    email: string;
    firstname: string;
    profilePicture: string;
    message: string;
    time: Moment;
    isRead: number;
}
