import { RouteProp } from '@react-navigation/native';

export interface HangoutDetailScreenProps {
    route: RouteProp<
        {
            params: {
                createdByUser: boolean;
                hangoutId: number;
            };
        },
        'params'
    >;
}
