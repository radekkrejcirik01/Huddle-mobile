import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useHeaderHeight } from '@react-navigation/elements';
import { PictureScreenProps } from '@screens/account/PictureScreen/PictureScreen.props';
import { PictureScreenStyle } from '@screens/account/PictureScreen/PictureScreen.style';

export const PictureScreen = ({ route }: PictureScreenProps): JSX.Element => {
    const { picture } = route.params;

    return (
        <View
            style={[
                PictureScreenStyle.flex,
                { paddingBottom: useHeaderHeight() }
            ]}
        >
            {!!picture && (
                <FastImage
                    resizeMode="contain"
                    source={{ uri: picture }}
                    style={PictureScreenStyle.flex}
                />
            )}
        </View>
    );
};
