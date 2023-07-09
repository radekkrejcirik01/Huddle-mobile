import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleInteractionsListItemProps } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.props';
import { HuddleInteractionsListItemStyle } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const HuddleInteractionsListItem = ({
    item,
    onPressPhoto,
    onOpenChat
}: HuddleInteractionsListItemProps): JSX.Element => (
    <View style={HuddleInteractionsListItemStyle.container}>
        <View style={HuddleInteractionsListItemStyle.infoContainer}>
            <TouchableOpacity onPress={onPressPhoto}>
                <ProfilePhoto
                    name={item.name}
                    photo={item?.profilePhoto}
                    size={40}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenChat}>
                <Text style={HuddleInteractionsListItemStyle.name}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={onOpenChat}
            style={HuddleInteractionsListItemStyle.buttonView}
        >
            <Text style={HuddleInteractionsListItemStyle.buttonText}>
                Message
            </Text>
        </TouchableOpacity>
    </View>
);
