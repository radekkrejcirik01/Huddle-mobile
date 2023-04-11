import { RouteProp } from '@react-navigation/native';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';

export interface PersonProfileScreenProps {
    route: RouteProp<
        { params: { checkInvitation: boolean } & PeopleListItemProps },
        'params'
    >;
}
