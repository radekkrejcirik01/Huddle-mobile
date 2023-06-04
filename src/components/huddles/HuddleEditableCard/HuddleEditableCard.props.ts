import { StyleProp, ViewStyle } from 'react-native';

export interface HuddleEditableCardProps {
    whatValue?: string;
    onWhatChange: (value: string) => void;
    style?: StyleProp<ViewStyle>;
    styleInput?: StyleProp<ViewStyle>;
}

export const HuddleEditableCardDefaultProps: Omit<
    HuddleEditableCardProps,
    'onWhatChange'
> = {
    whatValue: null,
    style: {},
    styleInput: {}
};
