import { StyleProp, ViewStyle } from 'react-native';

export interface HuddleEditableCardProps {
    whatValue?: string;
    onWhatChange: (value: string) => void;
    color: number;
    style?: StyleProp<ViewStyle>;
}

export const HuddleEditableCardDefaultProps: Omit<
    HuddleEditableCardProps,
    'onWhatChange' | 'color'
> = {
    whatValue: null,
    style: {}
};
