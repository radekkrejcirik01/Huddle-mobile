import { Moment } from 'moment';

export interface ConversationDataProps {
    id: number;
    sender: string;
    profilePhoto: string;
    conversationId: number;
    message: string;
    time: Moment;
    readBy: Array<{
        username: string;
        profilePhoto: string;
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
