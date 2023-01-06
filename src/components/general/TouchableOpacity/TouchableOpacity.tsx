import React from 'react';
import {
    TouchableOpacity as DefaultTouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

export const TouchableOpacity = ({
    ...props
}: TouchableOpacityProps): JSX.Element => (
    <DefaultTouchableOpacity activeOpacity={0.7} {...props} />
);
