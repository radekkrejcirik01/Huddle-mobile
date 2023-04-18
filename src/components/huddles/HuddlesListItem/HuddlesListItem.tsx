import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddlesListItemProps } from '@components/huddles/HuddlesListItem/HuddlesListItem.props';
import { HuddlesListItemStyle } from '@components/huddles/HuddlesListItem/HuddlesListItem.style';

export const HuddlesListItem = ({
    item,
    onPressCard,
    onPressProfilePhoto,
    onInteract
}: HuddlesListItemProps): JSX.Element => {
    const [interacted, setInteracted] = useState<boolean>();

    useEffect(() => setInteracted(!!item.interacted), [item.interacted]);

    const interactedText = useMemo(
        (): string => (interacted ? '✅' : '👋'),
        [interacted]
    );

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onPressCard(item)}
            style={HuddlesListItemStyle.container}
        >
            <View style={HuddlesListItemStyle.flex}>
                <Text style={HuddlesListItemStyle.nameText}>{item.name}</Text>
                <Text style={HuddlesListItemStyle.whatText}>{item.what}</Text>
                <Text style={HuddlesListItemStyle.whereText}>{item.where}</Text>
                <Text style={HuddlesListItemStyle.whenText}>{item.when}</Text>
            </View>
            <View style={HuddlesListItemStyle.rightContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => onPressProfilePhoto(item)}
                >
                    <FastImage
                        source={{ uri: item.profilePhoto }}
                        style={HuddlesListItemStyle.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        onInteract(item);
                        setInteracted(true);
                    }}
                    style={HuddlesListItemStyle.handView}
                >
                    <Text style={HuddlesListItemStyle.handText}>
                        {interactedText}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};
