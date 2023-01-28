import { RouteProp } from '@react-navigation/native';
import { Moment } from 'moment';

export interface EventScreenProps {
    route: RouteProp<
        {
            params: {
                hangoutId: number;
                confirmed: number;
                username: string;
            };
        },
        'params'
    >;
}

export interface EventScreenDataInterface {
    createdBy: string;
    title: string;
    time: Moment;
    place: string;
    picture: string;
    usernames: Array<string>;
}
