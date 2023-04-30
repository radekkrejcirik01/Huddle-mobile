import { RouteProp } from '@react-navigation/native';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export interface HuddleScreenProps {
    route: RouteProp<
        {
            params: {
                huddle: HuddleItemInterface;
            };
        },
        'params'
    >;
}

export interface HuddleInteractionInterface {
    id?: number;
    username: string;
    name: string;
    profilePhoto: string;
}
