import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContactItemProps } from '@components/contacts/ContactItem/ContactItem.props';
import { ContactItemStyle } from '@components/contacts/ContactItem/ContactItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const ContactItem = ({
    item,
    onItemPress,
    oItemLongPress,
    onPhotoPress,
    onAcceptPress
}: ContactItemProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onItemPress}
        onLongPress={oItemLongPress}
        style={ContactItemStyle.view}
    >
        <View style={ContactItemStyle.infoRow}>
            <ProfilePhoto
                name={item?.user?.name}
                photo={item?.user?.profilePhoto}
                onPhotoPress={onPhotoPress}
                size={42}
            />
            <View style={{ marginLeft: 8 }}>
                <Text style={ContactItemStyle.name}>{item?.user?.name}</Text>
                <Text style={ContactItemStyle.username}>
                    {item?.user?.username}
                </Text>
            </View>
        </View>
        {item?.accepted ? (
            <Text style={ContactItemStyle.chatEmoji}>💬</Text>
        ) : (
            <TouchableOpacity
                onPress={onAcceptPress}
                style={ContactItemStyle.acceptView}
            >
                <Text style={ContactItemStyle.acceptText}>Accept</Text>
            </TouchableOpacity>
        )}
    </TouchableOpacity>
);
