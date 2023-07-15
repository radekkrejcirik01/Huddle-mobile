import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { InviteListItemProps } from '@components/friends/InviteListItem/InviteListItem.props';
import { InviteListItemStyle } from '@components/friends/InviteListItem/InviteListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const InviteListItem = ({
    item,
    onAccept,
    onOpenProfile
}: InviteListItemProps): JSX.Element => (
    <View style={InviteListItemStyle.view}>
        <TouchableOpacity
            onPress={onOpenProfile}
            style={InviteListItemStyle.pressView}
        >
            <ProfilePhoto
                name={item.user.username}
                photo={item.user?.profilePhoto}
                size={45}
            />
            <Text style={InviteListItemStyle.usernameText}>
                {item?.user?.username}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={onAccept}
            style={InviteListItemStyle.acceptView}
        >
            <Text style={InviteListItemStyle.acceptText}>Accept</Text>
        </TouchableOpacity>
    </View>
);
