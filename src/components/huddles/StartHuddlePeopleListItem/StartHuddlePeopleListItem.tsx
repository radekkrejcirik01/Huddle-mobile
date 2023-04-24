import React, { useCallback, useMemo, useState } from 'react';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { StartHuddlePeopleListItemProps } from '@components/huddles/StartHuddlePeopleListItem/StartHuddlePeopleListItem.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddlePeopleListItemStyle } from '@components/huddles/StartHuddlePeopleListItem/StartHuddlePeopleListItem.style';

export const StartHuddlePeopleListItem = ({
    item,
    onSelect
}: StartHuddlePeopleListItemProps): JSX.Element => {
    const [selected, setSelected] = useState<boolean>(false);

    const selectedColor = useMemo(
        (): string => (selected ? COLORS.BUTTON_BLUE : COLORS.BLACK),
        [selected]
    );

    const onItemPress = useCallback(() => {
        setSelected(!selected);
        onSelect(item?.username);
    }, [item?.username, onSelect, selected]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onItemPress}
            style={StartHuddlePeopleListItemStyle.view}
        >
            <FastImage
                source={{ uri: item.profilePhoto }}
                style={[
                    StartHuddlePeopleListItemStyle.image,
                    {
                        borderColor: selectedColor
                    }
                ]}
            />
            <Text numberOfLines={1} style={StartHuddlePeopleListItemStyle.text}>
                {item?.profilePhoto ? item?.firstname : item?.username}
            </Text>
        </TouchableOpacity>
    );
};
