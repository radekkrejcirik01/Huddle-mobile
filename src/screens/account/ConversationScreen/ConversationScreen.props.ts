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

export interface HuddleItemInterface {
    id: number;
    sender: string;
    profilePhoto?: string;
    name: string;
    message: string;
    commentsNumber?: number;
    likesNumber?: number;
    liked?: number;
}
export interface MessageItemProps {
    id: number;
    sender: string;
    message: string;
    time: number;
    url?: string;
    huddle?: HuddleItemInterface;
    reactions?: Array<string>;
    readBy?: Array<string>;
    animate?: boolean;
}
