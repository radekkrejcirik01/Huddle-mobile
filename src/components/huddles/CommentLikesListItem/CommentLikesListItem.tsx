import React from 'react';
import { Text } from 'react-native';
import { CommentLikesListItemProps } from '@components/huddles/CommentLikesListItem/CommentLikesListItem.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { CommentLikesListItemStyle } from '@components/huddles/CommentLikesListItem/CommentLikesListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const CommentLikesListItem = ({
    item,
    onPress
}: CommentLikesListItemProps): JSX.Element => (
    <TouchableOpacity onPress={onPress} style={CommentLikesListItemStyle.view}>
        <ProfilePhoto name={item.name} photo={item?.profilePhoto} size={40} />
        <Text style={CommentLikesListItemStyle.nameText}>{item.name}</Text>
    </TouchableOpacity>
);
