import { IconEnum } from '@components/general/Icon/Icon.enum';
import { StyleProp, ViewStyle } from 'react-native';

export interface IconButtonProps {
    icon: IconEnum;
    size?: number;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const IconButtonDefaultProps: Omit<IconButtonProps, 'icon' | 'onPress'> =
    {
        size: 30,
        style: {}
    };
