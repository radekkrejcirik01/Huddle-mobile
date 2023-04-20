import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { HuddleModalScreenStyle } from '@components/huddles/HuddleModalScreen/HuddleModalScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddleInteractionsListItemProps } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem.props';

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
        <View style={HuddleModalScreenStyle.itemContainer}>
            <TouchableOpacity style={HuddleModalScreenStyle.itemInfoContainer}>
                <FastImage
                    source={{ uri: item?.profilePhoto }}
                    style={HuddleModalScreenStyle.itemPhoto}
                />
                <Text style={HuddleModalScreenStyle.itemName}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    hasConfirmedUser
                        ? openChat(item.username)
                        : onConfirm(item.username)
                }
                style={HuddleModalScreenStyle.itemButtonView}
            >
                <Text style={HuddleModalScreenStyle.itemButtonText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
