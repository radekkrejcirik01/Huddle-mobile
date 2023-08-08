import { StyleProp, ViewStyle } from 'react-native';

export interface PostHuddleCardProps {
    onMessageChange: (value: string) => void;
    onPhotoChoose: (value: string) => void;
    onPhotoRemove: () => void;
    onSend: () => void;
    style?: StyleProp<ViewStyle>;
}

export const PostHuddleCardDefaultProps: Omit<
    PostHuddleCardProps,
    'onMessageChange' | 'onPhotoChoose' | 'onPhotoRemove' | 'onSend'
> = {
    style: {}
};
