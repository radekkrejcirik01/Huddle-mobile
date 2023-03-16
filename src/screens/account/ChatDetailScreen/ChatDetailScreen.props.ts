import { RouteProp } from '@react-navigation/native';

export interface ChatDetailScreenProps {
    route: RouteProp<
        {
            params: {
                conversationId?: number;
            };
        },
        'params'
    >;
}
