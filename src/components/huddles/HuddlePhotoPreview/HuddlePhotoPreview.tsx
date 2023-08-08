import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { HuddlePhotoPreviewProps } from '@components/huddles/HuddlePhotoPreview/HuddlePhotoPreview.props';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { HuddlePhotoPreviewStyle } from '@components/huddles/HuddlePhotoPreview/HuddlePhotoPreview.style';

export const HuddlePhotoPreview = ({
    photo,
    onPressRemove
}: HuddlePhotoPreviewProps): JSX.Element => (
    <View style={HuddlePhotoPreviewStyle.container}>
        <View>
            <IconButton
                icon={IconEnum.CLOSE}
                onPress={onPressRemove}
                size={14}
                style={HuddlePhotoPreviewStyle.closeView}
            />
            <FastImage
                source={{ uri: photo }}
                style={HuddlePhotoPreviewStyle.image}
            />
        </View>
    </View>
);
