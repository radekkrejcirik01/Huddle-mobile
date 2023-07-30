import { RouteProp } from '@react-navigation/native';

export interface ConversationScreenProps {
    route: RouteProp<
        {
            params: {
                conversationId: number;
                name: string;
                profilePhoto: string;
                username?: string;
            };
        },
        'params'
    >;
}

export interface MessageItemProps {
    id: number;
    sender: string;
    message: string;
    time: number;
    url?: string;
    reactions?: Array<string>;
    readBy?: Array<string>;
    animate?: boolean;
}

export interface HuddleItemInterface {
    id: number;
    createdBy: string;
    profilePhoto?: string;
    name: string;
    topic: string;
    color: number;
    commentsNumber?: number;
    interacted?: number;
}
