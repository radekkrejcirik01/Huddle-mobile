import { RouteProp } from '@react-navigation/native';

export interface HangoutDetailScreenProps {
    route: RouteProp<
        {
            params: {
                hangoutId: number;
            };
        },
        'params'
    >;
}
