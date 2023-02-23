import { RouteProp } from '@react-navigation/native';
import { Moment } from 'moment';

export interface EventScreenProps {
    route: RouteProp<
        {
            params: {
                confirmed: number;
                hangoutId: number;
                hangoutType: string;
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
    usernames: Array<{
        username: string;
        name: string;
        profilePicture: string;
        confirmed: 1;
    }>;
}
