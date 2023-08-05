import React from 'react';
import { Text } from 'react-native';
import { CommentLikeItemProps } from '@components/huddles/CommentLikeItem/CommentLikeItem.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { CommentLikeItemStyle } from '@components/huddles/CommentLikeItem/CommentLikeItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const CommentLikeItem = ({
    item,
    onPress
}: CommentLikeItemProps): JSX.Element => (
    <TouchableOpacity onPress={onPress} style={CommentLikeItemStyle.view}>
        <ProfilePhoto name={item.name} photo={item?.profilePhoto} size={40} />
        <Text style={CommentLikeItemStyle.nameText}>{item.name}</Text>
    </TouchableOpacity>
);
