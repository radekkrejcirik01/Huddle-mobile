import React, { useMemo } from 'react';
import { Animated, StyleProp } from 'react-native';
import FastImage, { ImageStyle, Source } from 'react-native-fast-image';
import { ProfileAnimatedImageProps } from '@components/general/ProfileAnimatedImage/ProfileAnimatedImage.props';
import { ProfileAnimatedImageStyle } from '@components/general/ProfileAnimatedImage/ProfileAnimatedImage.style';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

export const ProfileAnimatedImage = ({
    source,
    scale
}: ProfileAnimatedImageProps): JSX.Element => {
    const AnimatedImage = Animated.createAnimatedComponent(FastImage);

    const imageSource = useMemo((): Source => ({ uri: source }), [source]);

    const style = useMemo(
        (): (
            | StyleProp<ImageStyle>
            | { transform: { scale: AnimatedInterpolation }[] }
        )[] => [
            ProfileAnimatedImageStyle.animatedImage,
            {
                transform: [
                    {
                        scale
                    }
                ]
            }
        ],
        [scale]
    );

    return (
        <AnimatedImage
            source={imageSource}
            resizeMode="contain"
            style={style}
        />
    );
};
