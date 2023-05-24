import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleInteractionsListItemProps } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.props';
import { HuddleInteractionsListItemStyle } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.style';

export const HuddleInteractionsListItem = ({
    item,
    onPressPhoto,
    onOpenChat
}: HuddleInteractionsListItemProps): JSX.Element => (
    <View style={HuddleInteractionsListItemStyle.container}>
        <View style={HuddleInteractionsListItemStyle.infoContainer}>
            <TouchableOpacity onPress={onPressPhoto}>
                <FastImage
                    source={{ uri: item?.profilePhoto }}
                    style={HuddleInteractionsListItemStyle.image}
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
