import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    HuddleInteractionsListItemDefaultProps,
    HuddleInteractionsListItemProps
} from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.props';
import { HuddleInteractionsListItemStyle } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.style';

export const HuddleInteractionsListItem = ({
    item,
    isConfirmed,
    onPressPhoto,
    onConfirm,
    onOpenChat
}: HuddleInteractionsListItemProps): JSX.Element => {
    const buttonText = useMemo(
        (): string => (isConfirmed ? 'Message' : 'Confirm'),
        [isConfirmed]
    );

    return (
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
                onPress={() => (isConfirmed ? onOpenChat() : onConfirm())}
                style={HuddleInteractionsListItemStyle.buttonView}
            >
                <Text style={HuddleInteractionsListItemStyle.buttonText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

HuddleInteractionsListItem.defaultProps =
    HuddleInteractionsListItemDefaultProps;
