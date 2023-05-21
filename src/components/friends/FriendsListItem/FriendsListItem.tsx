import React from 'react';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { FriendsListItemProps } from '@components/friends/FriendsListItem/FriendsListItem.props';
import { FriendsListItemStyle } from '@components/friends/FriendsListItem/FriendsListItem.style';

export const FriendsListItem = ({
    item,
    onItemPress,
    onPhotoPress
}: FriendsListItemProps): JSX.Element => (
    <TouchableOpacity onPress={onItemPress} style={FriendsListItemStyle.view}>
        <TouchableOpacity onPress={onPhotoPress}>
            <FastImage
                source={{ uri: item.profilePhoto }}
                style={FriendsListItemStyle.image}
            />
        </TouchableOpacity>
        <Text style={FriendsListItemStyle.name}>{item.name}</Text>
    </TouchableOpacity>
);
