import { useMemo, useRef } from 'react';
import {
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent
} from 'react-native';
import {
    animatedEventConfig,
    interpolateConfig
} from '@components/general/ProfileAnimatedImage/ProfileAnimatedImage.config';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

export const usePhotoScrollView = (): {
    scale: AnimatedInterpolation;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
} => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const scale = useMemo(
        (): AnimatedInterpolation => scrollY.interpolate(interpolateConfig),
        [scrollY]
    );

    const onScroll = useMemo(
        (): ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
            Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: { y: scrollY }
                        }
                    }
                ],
                animatedEventConfig
            ),
        [scrollY]
    );

    return {
        scale,
        onScroll
    };
};
