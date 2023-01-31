import React from 'react';
import {
    TouchableOpacity as DefaultTouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

export const TouchableOpacity = ({
    ...props
}: TouchableOpacityProps): JSX.Element => (
    <DefaultTouchableOpacity
        activeOpacity={0.7}
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        {...props}
    />
);
