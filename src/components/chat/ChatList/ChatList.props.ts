import { Moment } from 'moment';

export interface ChatDataProps {
    id: number;
    sender: string;
    profilePicture: string;
    conversationId: number;
    message: string;
    time: Moment;
    isRead: number;
}

export interface ChatListProps {
    conversationId: number;
}
