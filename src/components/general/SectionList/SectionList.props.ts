import { StyleProp, ViewStyle } from 'react-native';
import { ComingsUpDataInterface } from '@screens/account/HomeScreen/HomeScreen.props';

export interface SectionListProps {
    data?: Array<ComingsUpDataInterface>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const SectionListDefaultProps: SectionListProps = {
    data: [],
    contentContainerStyle: {}
};
