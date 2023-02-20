import { RouteProp } from '@react-navigation/native';

export interface PickPeopleScreenProps {
    route: RouteProp<
        {
            params: {
                hangoutId: number;
                usernames?: Array<string>;
            };
        },
        'params'
    >;
}
