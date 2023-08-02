import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SmallHuddleListItemProps } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem.props';
import { SmallHuddleListItemStyle } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem.style';

export const SmallHuddleListItem = ({
    item,
    onPressCard
}: SmallHuddleListItemProps): JSX.Element => (
    <TouchableOpacity
        onPress={() => onPressCard(item)}
        style={[SmallHuddleListItemStyle.container]}
    >
        <Text style={SmallHuddleListItemStyle.messageText}>
            {item?.message}
        </Text>
    </TouchableOpacity>
);
