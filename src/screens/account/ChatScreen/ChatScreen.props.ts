import { RouteProp } from '@react-navigation/native';

export interface ChatScreenProps {
    route: RouteProp<
        {
            params: {
                title: string;
                conversationId: number;
                usernames?: Array<string>;
                image?: string;
            };
        },
        'params'
    >;
}
