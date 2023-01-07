import { RouteProp } from '@react-navigation/native';
import { ComingsUpListItem } from '@screens/account/ProfileScreen/ProfileScreen.props';

export interface EventScreenProps {
    route: RouteProp<{ params: { item: ComingsUpListItem } }, 'params'>;
}
