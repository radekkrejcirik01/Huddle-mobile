import React from 'react';
import { Text } from 'react-native';
import { getHuddleColor } from '@hooks/getHuddleColor';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SmallHuddleListItemProps } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem.props';
import { SmallHuddleListItemStyle } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem.style';

export const SmallHuddleListItem = ({
    item,
    onPressCard
}: SmallHuddleListItemProps): JSX.Element => {
    const { primaryColor } = getHuddleColor(item.color);

    return (
        <TouchableOpacity
            onPress={() => onPressCard(item)}
            style={[
                SmallHuddleListItemStyle.container,
                { backgroundColor: primaryColor }
            ]}
        >
            <Text style={SmallHuddleListItemStyle.topicText}>
                {item?.topic}
            </Text>
        </TouchableOpacity>
    );
};
