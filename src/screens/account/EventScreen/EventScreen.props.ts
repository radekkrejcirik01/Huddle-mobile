import { RouteProp } from '@react-navigation/native';
import { ComingsUpListItem } from '@components/general/SectionList/SectionList.props';

export interface EventScreenProps {
    route: RouteProp<{ params: { item: ComingsUpListItem } }, 'params'>;
}
