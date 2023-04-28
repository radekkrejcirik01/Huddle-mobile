import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleInteractionsListItemProps } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.props';
import { HuddleInteractionsListItemStyle } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.style';

export const HuddleInteractionsListItem = ({
    hasConfirmedUser,
    item,
    onConfirm
}: HuddleInteractionsListItemProps): JSX.Element => {
    const buttonText = useMemo(
        (): string => (hasConfirmedUser ? 'Message' : 'Confirm'),
        [hasConfirmedUser]
    );

    const openChat = useCallback((username: string) => {}, []);

    return (
        <View style={HuddleInteractionsListItemStyle.container}>
            <TouchableOpacity
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
                    hasConfirmedUser
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
