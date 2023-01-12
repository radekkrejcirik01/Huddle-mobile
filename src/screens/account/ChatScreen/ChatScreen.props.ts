import { RouteProp } from '@react-navigation/native';

export interface ChatScreenProps {
    route: RouteProp<{ params: { username: string } }, 'params'>;
}
