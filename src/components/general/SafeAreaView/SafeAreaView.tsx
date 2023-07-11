import React from 'react';
import {
    SafeAreaView as DefaultSafeAreaView,
    SafeAreaViewProps
} from 'react-native-safe-area-context';

export const SafeAreaView = ({ ...props }: SafeAreaViewProps): JSX.Element => (
    <DefaultSafeAreaView edges={['top']} {...props} />
);
