import React from 'react';
import {
    IconButtonDefaultProps,
    IconButtonProps
} from '@components/general/IconButton/IconButton.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { Icon } from '@components/icon/Icon';

export const IconButton = ({
    icon,
    onPress,
    size,
    style
}: IconButtonProps): JSX.Element => (
    <TouchableOpacity onPress={onPress} style={style}>
        <Icon name={icon} size={size} />
    </TouchableOpacity>
);

IconButton.defaultProps = IconButtonDefaultProps;
