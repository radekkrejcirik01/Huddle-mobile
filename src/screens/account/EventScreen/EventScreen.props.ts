import { RouteProp } from '@react-navigation/native';
import { ComingsUpListItem } from '@screens/account/HomeScreen/HomeScreen.props';

export interface EventScreenProps {
    route: RouteProp<{ params: { item: ComingsUpListItem } }, 'params'>;
}
