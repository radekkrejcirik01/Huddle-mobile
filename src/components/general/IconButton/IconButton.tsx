import React from 'react';
import {
    IconButtonDefaultProps,
    IconButtonProps
} from '@components/general/IconButton/IconButton.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { Icon } from '@components/general/Icon/Icon';

export const IconButton = ({
    icon,
    onPress,
    size,
    style
}: IconButtonProps): JSX.Element => (
    <TouchableOpacity
        onPress={onPress}
        style={style}
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
        <Icon name={icon} size={size} />
    </TouchableOpacity>
);

IconButton.defaultProps = IconButtonDefaultProps;
