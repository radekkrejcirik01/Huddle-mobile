import { RouteProp } from '@react-navigation/native';

export interface PersonProfileScreenProps {
    route: RouteProp<
        { params: { username: string; name: string; profilePhoto?: string } },
        'params'
    >;
}
