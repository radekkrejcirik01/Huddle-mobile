import { RouteProp } from '@react-navigation/native';

export interface ProfilePhotoScreenProps {
    route: RouteProp<
        { params: { name: string; profilePhoto?: string } },
        'params'
    >;
}
