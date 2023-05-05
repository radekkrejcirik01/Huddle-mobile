import { Animated } from 'react-native';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

export interface ProfileAnimatedImageProps {
    source: string;
    scale: AnimatedInterpolation;
}
