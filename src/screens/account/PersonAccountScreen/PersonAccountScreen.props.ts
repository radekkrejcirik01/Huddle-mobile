import { RouteProp } from '@react-navigation/native';
import { PeopleListItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';

export interface PersonAccountScreenProps {
    route: RouteProp<{ params: PeopleListItemProps }, 'params'>;
}
