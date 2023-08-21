import { Omit, StyleProp, ViewStyle } from 'react-native';

export interface ProfilePhotoProps {
    name: string;
    photo: string;
    size: number;
    onPhotoPress?: () => void;
    textBackgroundColor?: string;
    style?: StyleProp<ViewStyle>;
}

export const ProfilePhotoDefaultProps: Omit<
    ProfilePhotoProps,
    'name' | 'photo' | 'size'
> = {
    textBackgroundColor: null,
    onPhotoPress: null,
    style: {}
};
