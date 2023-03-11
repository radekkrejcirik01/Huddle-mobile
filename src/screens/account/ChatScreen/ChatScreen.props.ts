import { RouteProp } from '@react-navigation/native';

export interface ChatScreenProps {
    route: RouteProp<
        {
            params: {
                createNewConversation: boolean;
                conversationId: number;
                usernames?: Array<string>;
            };
        },
        'params'
    >;
}
