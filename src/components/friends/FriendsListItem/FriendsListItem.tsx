import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { FriendsListItemProps } from '@components/friends/FriendsListItem/FriendsListItem.props';
import { FriendsListItemStyle } from '@components/friends/FriendsListItem/FriendsListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const FriendsListItem = ({
    item,
    onItemPress,
    onPhotoPress
}: FriendsListItemProps): JSX.Element => (
    <TouchableOpacity onPress={onItemPress} style={FriendsListItemStyle.view}>
        <View style={FriendsListItemStyle.infoRow}>
            <TouchableOpacity onPress={onPhotoPress}>
                <ProfilePhoto
                    name={item.name}
                    photo={item?.profilePhoto}
                    size={40}
                />
            </TouchableOpacity>
            <Text style={FriendsListItemStyle.name}>{item.name}</Text>
        </View>
        <Text style={FriendsListItemStyle.chatEmoji}>💬</Text>
    </TouchableOpacity>
);
