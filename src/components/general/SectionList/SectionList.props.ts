import { StyleProp, ViewStyle } from 'react-native';
import { ComingsUpDataInterface } from '@screens/account/ProfileScreen/ProfileScreen.props';

export interface SectionListProps {
    data?: Array<ComingsUpDataInterface>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const SectionListDefaultProps: SectionListProps = {
    data: [],
    contentContainerStyle: {}
};
