import { RouteProp } from '@react-navigation/native';
import { EventScreenDataInterface } from '@screens/account/EventScreen/EventScreen.props';

export interface HangoutDetailScreenProps {
    route: RouteProp<
        {
            params: {
                hangoutId: number;
                hangout: EventScreenDataInterface;
            };
        },
        'params'
    >;
}
