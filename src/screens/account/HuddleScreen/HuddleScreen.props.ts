import { RouteProp } from '@react-navigation/native';
import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface HuddleScreenProps {
    route: RouteProp<
        {
            params: {
                huddle: HuddleItemInterface;
                huddleId: number;
            };
        },
        'params'
    >;
}

export interface HuddleInteractionInterface {
    username: string;
    name: string;
    profilePhoto: string;
}
