import { StackNavigationOptions } from '@react-navigation/stack';
import { transitionConfig } from './RootStackNavigator.config';

export const NavigatorScreenOptions: StackNavigationOptions = {
    transitionSpec: {
        open: transitionConfig,
        close: transitionConfig
    }
};

export const NoHeader: StackNavigationOptions = {
    headerShown: false
};
