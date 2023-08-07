import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { HuddlePhotosPreviewsProps } from '@components/huddles/HuddlePhotosPreviews/HuddlePhotosPreviews.props';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { HuddlePhotosPreviewsStyle } from '@components/huddles/HuddlePhotosPreviews/HuddlePhotosPreviews.style';

export const HuddlePhotosPreviews = ({
    photos,
    onPressRemove
}: HuddlePhotosPreviewsProps): JSX.Element => (
    <View style={HuddlePhotosPreviewsStyle.container}>
        {photos.map((value, index) => (
            <View
                key={value}
                style={index !== 0 && HuddlePhotosPreviewsStyle.imageView}
            >
                <IconButton
                    icon={IconEnum.CLOSE}
                    onPress={() => onPressRemove(index)}
                    size={10}
                    style={HuddlePhotosPreviewsStyle.closeView}
                />
                <FastImage
                    source={{ uri: value }}
                    style={HuddlePhotosPreviewsStyle.image}
                />
            </View>
        ))}
    </View>
);
