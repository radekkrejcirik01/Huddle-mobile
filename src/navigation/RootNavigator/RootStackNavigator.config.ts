import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

export const transitionConfig: TransitionSpec = {
    animation: 'spring',
    config: {
        speed: 7,
        overshootClamping: true
    }
};
