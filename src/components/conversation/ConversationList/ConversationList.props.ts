import { Moment } from 'moment';

export interface ConversationDataProps {
    id: number;
    sender: string;
    profilePicture: string;
    conversationId: number;
    message: string;
    time: Moment;
    readBy: Array<{
        username: string;
        profilePicture: string;
    }>;
    reactedBy: Array<{
        username: string;
        reaction: string;
    }>;
    url: string;
}

export interface ConversationListProps {
    conversationId: number;
}
