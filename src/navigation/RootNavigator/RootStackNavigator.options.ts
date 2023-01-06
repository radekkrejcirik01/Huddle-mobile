import { StackNavigationOptions } from '@react-navigation/stack';
import DIMENSIONS from '@constants/DIMENSIONS';
import { transitionConfig } from './RootStackNavigator.config';

export const NavigatorScreenOptions: StackNavigationOptions = {
    transitionSpec: {
        open: transitionConfig(800),
        close: transitionConfig(1000)
    },
    gestureResponseDistance: DIMENSIONS.width
};

export const NoHeader: StackNavigationOptions = {
    headerShown: false
};
