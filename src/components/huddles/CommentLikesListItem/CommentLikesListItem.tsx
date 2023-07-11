import React from 'react';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CommentLikesListItemProps } from '@components/huddles/CommentLikesListItem/CommentLikesListItem.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { CommentLikesListItemStyle } from '@components/huddles/CommentLikesListItem/CommentLikesListItem.style';

export const CommentLikesListItem = ({
    item,
    onPress
}: CommentLikesListItemProps): JSX.Element => (
    <TouchableOpacity onPress={onPress} style={CommentLikesListItemStyle.view}>
        <FastImage
            source={{ uri: item?.profilePhoto }}
            style={CommentLikesListItemStyle.image}
        />
        <Text style={CommentLikesListItemStyle.nameText}>{item.name}</Text>
    </TouchableOpacity>
);
