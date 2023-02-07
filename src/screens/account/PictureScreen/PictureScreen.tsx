import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { PictureScreenProps } from '@screens/account/PictureScreen/PictureScreen.props';
import { PictureScreenStyle } from '@screens/account/PictureScreen/PictureScreen.style';

export const PictureScreen = ({ route }: PictureScreenProps): JSX.Element => {
    const { picture, title = null } = route.params;

    const navigation = useNavigation();

    useEffect(() => navigation.setOptions({ title }), [navigation, title]);

    return (
        <View style={PictureScreenStyle.view}>
            {!!picture && (
                <FastImage
                    resizeMode="contain"
                    source={{ uri: picture }}
                    style={PictureScreenStyle.image}
                />
            )}
        </View>
    );
};
