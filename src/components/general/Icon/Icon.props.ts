import { StyleProp, ViewStyle } from 'react-native';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export interface IconProps {
    name: IconEnum;
    size?: number;
    style?: StyleProp<ViewStyle>;
}

export const IconDefaultProps: Omit<IconProps, 'name'> = {
    size: 30,
    style: null
};
