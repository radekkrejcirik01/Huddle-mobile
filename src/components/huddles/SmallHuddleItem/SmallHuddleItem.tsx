import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SmallHuddleItemProps } from '@components/huddles/SmallHuddleItem/SmallHuddleItem.props';
import { SmallHuddleItemStyle } from '@components/huddles/SmallHuddleItem/SmallHuddleItem.style';

export const SmallHuddleItem = ({
    item,
    onPressCard,
    onLongPressCard
}: SmallHuddleItemProps): JSX.Element => (
    <TouchableOpacity
        onPress={onPressCard}
        onLongPress={onLongPressCard}
        style={SmallHuddleItemStyle.container}
    >
        <Text style={SmallHuddleItemStyle.messageText}>{item?.message}</Text>
    </TouchableOpacity>
);
