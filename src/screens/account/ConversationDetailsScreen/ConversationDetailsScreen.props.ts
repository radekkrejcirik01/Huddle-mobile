import { RouteProp } from '@react-navigation/native';

export interface ConversationDetailsScreenProps {
    route: RouteProp<
        {
            params: {
                conversationId?: number;
            };
        },
        'params'
    >;
}
