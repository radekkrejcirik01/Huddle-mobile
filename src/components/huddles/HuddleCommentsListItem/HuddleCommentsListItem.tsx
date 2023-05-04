import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { HuddleCommentsListItemProps } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { HuddleCommentsListItemStyle } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.style';
import { getLocalTimeFromUTC } from '@functions/getLocalTimeFromUTC';

export const HuddleCommentsListItem = ({
    item,
    onPressProfilePhoto,
    onPressName,
    onPressLike
}: HuddleCommentsListItemProps): JSX.Element => (
    <View style={HuddleCommentsListItemStyle.container}>
        <View style={HuddleCommentsListItemStyle.content}>
            <TouchableOpacity
                onPress={onPressProfilePhoto}
                style={HuddleCommentsListItemStyle.imageView}
            >
                <FastImage
                    source={{ uri: item?.profilePhoto }}
                    style={HuddleCommentsListItemStyle.image}
                />
            </TouchableOpacity>
            <View style={HuddleCommentsListItemStyle.textsContainer}>
                <View style={HuddleCommentsListItemStyle.row}>
                    <TouchableOpacity
                        onPress={onPressName}
                        style={HuddleCommentsListItemStyle.nameView}
                    >
                        <Text style={HuddleCommentsListItemStyle.nameText}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                    <Text style={HuddleCommentsListItemStyle.timeText}>
                        {getLocalTimeFromUTC(item.time).fromNow()}
                    </Text>
                    {!!item?.mention && (
                        <TouchableOpacity
                            style={HuddleCommentsListItemStyle.mentionView}
                        >
                            <Text
                                style={HuddleCommentsListItemStyle.mentionText}
                            >
                                @{item?.mention}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={HuddleCommentsListItemStyle.messageText}>
                    {item.message}
                </Text>
            </View>
        </View>
        <IconButton
            icon={IconEnum.HEART}
            onPress={onPressLike}
            size={18}
            style={HuddleCommentsListItemStyle.like}
        />
    </View>
);
