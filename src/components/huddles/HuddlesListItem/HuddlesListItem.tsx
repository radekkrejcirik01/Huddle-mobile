import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { HuddlesListItemProps } from '@components/huddles/HuddlesListItem/HuddlesListItem.props';
import { HuddlesListItemStyle } from '@components/huddles/HuddlesListItem/HuddlesListItem.style';
import { ReducerProps } from '@store/index/index.props';

export const HuddlesListItem = ({
    item,
    onPressCard,
    onPressProfilePhoto,
    onInteract
}: HuddlesListItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [interacted, setInteracted] = useState<boolean>();

    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => setInteracted(!!item.interacted), [item.interacted]);

    const isCreateByUser = useMemo(
        (): boolean => item?.createdBy === username,
        [item?.createdBy, username]
    );

    const interactAction = useCallback(() => {
        onInteract({ ...item, interacted: interacted ? 1 : 0 });

        setInteracted(!interacted);
    }, [interacted, item, onInteract]);

    const removeInteractionActionSheet = useCallback(() => {
        const options = ['Remove', 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 1,
                userInterfaceStyle: 'dark',
                title: 'Remove interaction?'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    interactAction();
                }
            }
        );
    }, [interactAction, showActionSheetWithOptions]);

    const interact = useCallback(() => {
        if (interacted) {
            removeInteractionActionSheet();
        } else {
            interactAction();
        }
    }, [interactAction, interacted, removeInteractionActionSheet]);

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
                    disabled={isCreateByUser}
                    activeOpacity={0.9}
                    onPress={() => onPressProfilePhoto(item)}
                >
                    <FastImage
                        source={{ uri: item?.profilePhoto }}
                        style={HuddlesListItemStyle.image}
                    />
                </TouchableOpacity>
                {!isCreateByUser && (
                    <TouchableOpacity
                        onPress={interact}
                        style={HuddlesListItemStyle.handView}
                    >
                        <Text style={HuddlesListItemStyle.handText}>
                            {interactedText}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};
