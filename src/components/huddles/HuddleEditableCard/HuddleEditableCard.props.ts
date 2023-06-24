import { StyleProp, ViewStyle } from 'react-native';

export interface HuddleEditableCardProps {
    topicValue?: string;
    onTopicChange: (value: string) => void;
    color: number;
    style?: StyleProp<ViewStyle>;
}

export const HuddleEditableCardDefaultProps: Omit<
    HuddleEditableCardProps,
    'onTopicChange' | 'color'
> = {
    topicValue: null,
    style: {}
};
