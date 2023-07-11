import { Omit } from 'react-native';

export interface ProfilePhotoProps {
    name: string;
    photo: string;
    size: number;
    textBackgroundColor?: string;
}

export const ProfilePhotoDefaultProps: Omit<
    ProfilePhotoProps,
    'name' | 'photo' | 'size'
> = {
    textBackgroundColor: null
};
