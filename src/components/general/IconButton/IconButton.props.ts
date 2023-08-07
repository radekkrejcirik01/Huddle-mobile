import { StyleProp, ViewStyle } from 'react-native';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export interface IconButtonProps {
    icon: IconEnum;
    size?: number;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

export const IconButtonDefaultProps: Omit<IconButtonProps, 'icon' | 'onPress'> =
    {
        size: 30,
        style: {},
        disabled: false
    };
