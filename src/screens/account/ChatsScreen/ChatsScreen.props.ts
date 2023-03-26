import { Moment } from 'moment';

export interface ChatsListDataProps {
    id: number;
    usernames: Array<{
        username: string;
        firstname: string;
        profilePicture: string;
    }>;
    name: string;
    picture: string;
    message: string;
    time: Moment;
    isRead: number;
    type: string;
}
