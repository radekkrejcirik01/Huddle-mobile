import { StyleProp, ViewStyle } from 'react-native';

export interface HuddleEditableCardProps {
    whatValue?: string;
    onWhatChange: (value: string) => void;
    whereValue?: string;
    onWhereChange: (value: string) => void;
    whenValue?: string;
    onWhenChange: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}

export const HuddleEditableCardDefaultProps: Omit<
    HuddleEditableCardProps,
    'onWhatChange' | 'onWhereChange' | 'onWhenChange'
> = {
    whatValue: null,
    whereValue: null,
    whenValue: null,
    style: {}
};
