import React, { useCallback, useMemo } from 'react';
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
    onConfirm
}: HuddleInteractionsListItemProps): JSX.Element => {
    const buttonText = useMemo(
        (): string => (isConfirmed ? 'Message' : 'Confirm'),
        [isConfirmed]
    );

    const openProfile = useCallback(() => {}, []);

    const openChat = useCallback((username: string) => {}, []);

    return (
        <View style={HuddleInteractionsListItemStyle.container}>
            <TouchableOpacity
                onPress={openProfile}
                style={HuddleInteractionsListItemStyle.infoContainer}
            >
                <FastImage
                    source={{ uri: item?.profilePhoto }}
                    style={HuddleInteractionsListItemStyle.image}
                />
                <Text style={HuddleInteractionsListItemStyle.name}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    isConfirmed
                        ? openChat(item.username)
                        : onConfirm(item.username)
                }
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
