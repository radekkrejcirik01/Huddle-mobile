import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SmallHuddleListItemProps } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem.props';
import { SmallHuddleListItemStyle } from '@components/huddles/SmallHuddleListItem/SmallHuddleListItem.style';
import COLORS from '@constants/COLORS';

export const SmallHuddleListItem = ({
    item,
    onPressCard
}: SmallHuddleListItemProps): JSX.Element => (
    <TouchableOpacity
        onPress={() => onPressCard(item)}
        style={[
            SmallHuddleListItemStyle.container,
            !!item?.confirmed &&
                !item.canceled && { backgroundColor: COLORS.MAIN_GREEN }
        ]}
    >
        <View style={SmallHuddleListItemStyle.flex}>
            <Text style={SmallHuddleListItemStyle.whatText}>{item?.what}</Text>
        </View>
        <FastImage
            source={{ uri: item?.profilePhoto }}
            style={SmallHuddleListItemStyle.image}
        />
    </TouchableOpacity>
);
