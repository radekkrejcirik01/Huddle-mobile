import { RouteProp } from '@react-navigation/native';

export interface HuddleScreenProps {
    route: RouteProp<
        {
            params: {
                huddleId: number;
            };
        },
        'params'
    >;
}
