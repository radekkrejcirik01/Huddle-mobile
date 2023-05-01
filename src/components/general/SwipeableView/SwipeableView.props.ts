import { StyleProp, ViewStyle } from 'react-native';

export interface SwipeableViewProps {
    children: JSX.Element;
    text: string;
    onAction: () => void;
    style?: StyleProp<ViewStyle>;
}

export const SwipeableViewDefaultProps: Omit<
    SwipeableViewProps,
    'children' | 'text' | 'onAction'
> = {
    style: {}
};
