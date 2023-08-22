import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
    ProfilePhotoDefaultProps,
    ProfilePhotoProps
} from '@components/general/ProfilePhoto/ProfilePhoto.props';
import COLORS from '@constants/COLORS';
import { ProfilePhotoStyle } from '@components/general/ProfilePhoto/ProfilePhoto.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const ProfilePhoto = ({
    name,
    photo,
    size,
    textBackgroundColor,
    onPhotoPress,
    style
}: ProfilePhotoProps): JSX.Element => (
    <TouchableOpacity
        disabled={!onPhotoPress}
        onPress={onPhotoPress}
        style={style}
    >
        {photo ? (
            <FastImage
                source={{
                    uri: photo
                }}
                style={[
                    ProfilePhotoStyle.image,
                    {
                        width: size,
                        height: size
                    }
                ]}
            />
        ) : (
            <View
                style={[
                    ProfilePhotoStyle.acronymView,
                    {
                        height: size,
                        width: size,
                        backgroundColor: textBackgroundColor || COLORS.GRAY_400
                    }
                ]}
            >
                <Text
                    style={[
                        ProfilePhotoStyle.acronymText,
                        {
                            fontSize: size / 2
                        }
                    ]}
                >
                    {!!name?.length && name[0]}
                </Text>
            </View>
        )}
    </TouchableOpacity>
);

ProfilePhoto.defaultProps = ProfilePhotoDefaultProps;
