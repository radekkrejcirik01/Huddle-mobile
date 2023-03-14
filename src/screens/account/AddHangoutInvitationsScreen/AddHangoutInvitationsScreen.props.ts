import { RouteProp } from '@react-navigation/native';

export interface AddHangoutInvitationsScreenProps {
    route: RouteProp<
        {
            params: {
                hangoutId: number;
            };
        },
        'params'
    >;
}
