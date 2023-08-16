import React from 'react';
import { Text, View } from 'react-native';
import { LargeHuddleItem } from '@components/huddles/LargeHuddleItem/LargeHuddleItem';
import { MessageHuddleItemProps } from '@components/conversation/MessageHuddleItem/MessageHuddleItem.props';
import { MessageHuddleItemStyle } from '@components/conversation/MessageHuddleItem/MessageHuddleItem.style';

export const MessageHuddleItem = ({
    isMessageAbove,
    item,
    onHuddleProfilePress,
    onHuddlePress,
    onHuddleLongPress,
    onHuddleLikePress
}: MessageHuddleItemProps): JSX.Element => (
    <View
        style={[
            MessageHuddleItemStyle.huddleView,
            isMessageAbove && MessageHuddleItemStyle.marginTop
        ]}
    >
        <View style={MessageHuddleItemStyle.huddleTitleView}>
            <Text style={MessageHuddleItemStyle.huddleTitleText}>Leaf</Text>
        </View>
        <LargeHuddleItem
            item={item.huddle}
            onProfilePress={onHuddleProfilePress}
            onCardPress={onHuddlePress}
            onCardLongPress={onHuddleLongPress}
            onLikePress={onHuddleLikePress}
        />
    </View>
);
