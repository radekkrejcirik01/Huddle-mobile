import { RouteProp } from '@react-navigation/native';
import { FriendsListItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';

export interface FriendProfileScreenProps {
    route: RouteProp<
        { params: { checkInvitation: boolean } & FriendsListItemProps },
        'params'
    >;
}
