import { StyleProp, ViewStyle } from 'react-native';

export interface HuddleEditableCardProps {
    messageValue?: string;
    onMessageChange: (value: string) => void;
    onSend: () => void;
    style?: StyleProp<ViewStyle>;
}

export const HuddleEditableCardDefaultProps: Omit<
    HuddleEditableCardProps,
    'onMessageChange' | 'onSend'
> = {
    messageValue: null,
    style: {}
};
