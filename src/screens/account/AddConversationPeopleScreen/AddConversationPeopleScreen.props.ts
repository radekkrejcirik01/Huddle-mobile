import { RouteProp } from '@react-navigation/native';

export interface AddConversationPeopleScreenProps {
    route: RouteProp<
        {
            params: {
                conversationId: number;
            };
        },
        'params'
    >;
}
