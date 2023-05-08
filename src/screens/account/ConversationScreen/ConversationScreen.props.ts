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
    time: string;
    url?: string;
}
