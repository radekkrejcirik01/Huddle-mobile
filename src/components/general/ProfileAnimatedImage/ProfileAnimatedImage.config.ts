import { Animated, ScrollView } from 'react-native';
import DIMENSIONS from '@constants/DIMENSIONS';

export const interpolateConfig: Animated.InterpolationConfigType = {
    inputRange: [-DIMENSIONS.width / 2 + 15, 0],
    outputRange: [2, 1],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp'
};

export const animatedEventConfig: Animated.EventConfig<ScrollView> = {
    useNativeDriver: true
};
