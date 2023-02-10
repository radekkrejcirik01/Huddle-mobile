import { RouteProp } from '@react-navigation/native';

export interface PictureScreenProps {
    route: RouteProp<
        {
            params: {
                picture?: string;
            };
        },
        'params'
    >;
}
