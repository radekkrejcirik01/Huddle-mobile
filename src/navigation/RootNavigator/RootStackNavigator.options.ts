import { StackNavigationOptions } from '@react-navigation/stack';
import { transitionConfig } from './RootStackNavigator.config';

export const NavigatorScreenOptions: StackNavigationOptions = {
    transitionSpec: {
        open: transitionConfig(800),
        close: transitionConfig(1000)
    }
};

export const NoHeader: StackNavigationOptions = {
    headerShown: false
};
