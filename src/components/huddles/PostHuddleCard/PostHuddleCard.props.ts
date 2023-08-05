import { StyleProp, ViewStyle } from 'react-native';

export interface PostHuddleCardProps {
    messageValue?: string;
    onMessageChange: (value: string) => void;
    onSend: () => void;
    style?: StyleProp<ViewStyle>;
}

export const HuddleEditableCardDefaultProps: Omit<
    PostHuddleCardProps,
    'onMessageChange' | 'onSend'
> = {
    messageValue: null,
    style: {}
};
