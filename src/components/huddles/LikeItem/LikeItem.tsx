import React from 'react';
import { Text } from 'react-native';
import { LikeItemProps } from '@components/huddles/LikeItem/LikeItem.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { LikeItemStyle } from '@components/huddles/LikeItem/LikeItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const LikeItem = ({ item, onPress }: LikeItemProps): JSX.Element => (
    <TouchableOpacity onPress={onPress} style={LikeItemStyle.view}>
        <ProfilePhoto name={item.name} photo={item?.profilePhoto} size={40} />
        <Text style={LikeItemStyle.nameText}>{item.name}</Text>
    </TouchableOpacity>
);
