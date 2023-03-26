import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import {
    ListItemDefaultProps,
    ListItemProps
} from '@components/general/ListItem/ListItem.props';
import { ListItemStyle } from '@components/general/ListItem/ListItem.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Icon } from '@components/general/Icon/Icon';
import COLORS from '@constants/COLORS';

export const ListItem = ({
    icon,
    title,
    description,
    hasSwitch,
    toggleSwitch,
    switchValue,
    hasArrow,
    onPress,
    style,
    textStyle
}: ListItemProps): JSX.Element => {
    const [valueSwitch, setValueSwitch] = useState<boolean>(switchValue);

    useEffect(() => {
        setValueSwitch(switchValue);
    }, [switchValue]);

    const onValueChange = useCallback(() => {
        toggleSwitch(!valueSwitch);
        setValueSwitch(!valueSwitch);
    }, [toggleSwitch, valueSwitch]);

    return (
        <View style={style}>
            <TouchableOpacity
                onPress={onPress}
                disabled={hasSwitch}
                style={ListItemStyle.touchableOpacity}
            >
                {icon}
                <Text
                    style={[
                        ListItemStyle.title,
                        hasArrow && ListItemStyle.flex,
                        textStyle
                    ]}
                >
                    {title}
                </Text>
                <View style={ListItemStyle.containerRight}>
                    <Text style={ListItemStyle.description}>{description}</Text>
                    {hasSwitch && (
                        <Switch
                            onValueChange={onValueChange}
                            value={valueSwitch}
                            ios_backgroundColor={COLORS.LIGHTGRAY}
                        />
                    )}
                    {hasArrow && <Icon name={IconEnum.BACK_RIGHT} size={18} />}
                </View>
            </TouchableOpacity>
        </View>
    );
};

ListItem.defaultProps = ListItemDefaultProps;
