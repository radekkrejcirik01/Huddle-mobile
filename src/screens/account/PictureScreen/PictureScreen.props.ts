import { RouteProp } from '@react-navigation/native';

export interface PictureScreenProps {
    route: RouteProp<
        {
            params: {
                title: string;
                picture: string;
            };
        },
        'params'
    >;
}
