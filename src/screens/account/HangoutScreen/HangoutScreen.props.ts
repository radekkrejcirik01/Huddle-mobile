import { RouteProp } from '@react-navigation/native';
import { Moment } from 'moment';

export interface HangoutScreenProps {
    route: RouteProp<
        {
            params: {
                confirmed: number;
                hangoutId: number;
                hangoutType: string;
                invitedBy: string;
            };
        },
        'params'
    >;
}

export interface HangoutScreenDataInterface {
    createdBy: string;
    title: string;
    time: Moment;
    place: string;
    picture: string;
    usernames: Array<HangoutUserInterface>;
    type: string;
    creatorConfirmed: number;
}

export interface HangoutUserInterface {
    username: string;
    firstname: string;
    profilePicture: string;
    confirmed: number;
}
