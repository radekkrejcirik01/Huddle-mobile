import { RouteProp } from '@react-navigation/native';

export interface HangoutDetailsScreenProps {
    route: RouteProp<
        {
            params: {
                hangoutId: number;
            };
        },
        'params'
    >;
}
