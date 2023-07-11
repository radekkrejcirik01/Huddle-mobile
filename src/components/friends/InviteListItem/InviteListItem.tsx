import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { InviteListItemProps } from '@components/friends/InviteListItem/InviteListItem.props';
import { InviteListItemStyle } from '@components/friends/InviteListItem/InviteListItem.style';

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
            <FastImage
                source={{ uri: item.user?.profilePhoto }}
                style={InviteListItemStyle.image}
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
