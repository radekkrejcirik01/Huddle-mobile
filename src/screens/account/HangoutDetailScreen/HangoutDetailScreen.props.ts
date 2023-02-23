import { RouteProp } from '@react-navigation/native';
import { Moment } from 'moment';

export interface HangoutDetailScreenProps {
    route: RouteProp<
        {
            params: {
                createdByUser: boolean;
                hangoutId: number;
                photo: string;
                title: string;
                time: Moment;
                plan: string;
            };
        },
        'params'
    >;
}
