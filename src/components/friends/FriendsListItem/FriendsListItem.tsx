import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { FriendsListItemProps } from '@components/friends/FriendsListItem/FriendsListItem.props';
import { FriendsListItemStyle } from '@components/friends/FriendsListItem/FriendsListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const FriendsListItem = ({
    item,
    onItemPress,
    onPhotoPress,
    onAcceptPress
}: FriendsListItemProps): JSX.Element => (
    <TouchableOpacity onPress={onItemPress} style={FriendsListItemStyle.view}>
        <View style={FriendsListItemStyle.infoRow}>
            <TouchableOpacity onPress={onPhotoPress}>
                <ProfilePhoto
                    name={item.user.name}
                    photo={item.user?.profilePhoto}
                    size={35}
                />
            </TouchableOpacity>
            <Text style={FriendsListItemStyle.name}>{item.user.name}</Text>
        </View>
        {item?.accepted ? (
            <Text style={FriendsListItemStyle.chatEmoji}>💬</Text>
        ) : (
            <TouchableOpacity
                onPress={onAcceptPress}
                style={FriendsListItemStyle.acceptView}
            >
                <Text style={FriendsListItemStyle.acceptText}>Accept</Text>
            </TouchableOpacity>
        )}
    </TouchableOpacity>
);
