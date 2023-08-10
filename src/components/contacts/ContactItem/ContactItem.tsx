import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ContactItemProps } from '@components/contacts/ContactItem/ContactItem.props';
import { ContactItemStyle } from '@components/contacts/ContactItem/ContactItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const ContactItem = ({
    item,
    onItemPress,
    onPhotoPress,
    onAcceptPress
}: ContactItemProps): JSX.Element => (
    <TouchableOpacity onPress={onItemPress} style={ContactItemStyle.view}>
        <View style={ContactItemStyle.infoRow}>
            <TouchableOpacity onPress={onPhotoPress}>
                <ProfilePhoto
                    name={item.user.name}
                    photo={item.user?.profilePhoto}
                    size={45}
                />
            </TouchableOpacity>
            <Text style={ContactItemStyle.name}>{item.user.name}</Text>
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
