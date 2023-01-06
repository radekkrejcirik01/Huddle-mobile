import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

export const transitionConfig = (stiffness: number): TransitionSpec => ({
    animation: 'spring',
    config: {
        stiffness,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01
    }
});
