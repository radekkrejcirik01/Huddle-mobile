import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    LargeHuddleListItemProps,
    LargeHuddlesListItemDefaultProps
} from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.props';
import { LargeHuddleListItemStyle } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.style';
import COLORS from '@constants/COLORS';

export const LargeHuddleListItem = ({
    item,
    created,
    onPressCard,
    onPressProfilePhoto,
    onPressInteract,
    onItemLongPress,
    hideCommentsNumber,
    style
}: LargeHuddleListItemProps): JSX.Element => {
    const [interacted, setInteracted] = useState<boolean>();

    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => setInteracted(!!item?.interacted), [item?.interacted]);

    const interactAction = useCallback(() => {
        onPressInteract();

        item.interacted = interacted ? 0 : 1;
        setInteracted(!interacted);
    }, [interacted, item, onPressInteract]);

    const removeInteractionActionSheet = useCallback(() => {
        const options = ['Remove', 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 1,
                userInterfaceStyle: 'dark',
                title: 'Remove tap?'
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
            disabled={!onPressCard}
            onPress={onPressCard}
            onLongPress={onItemLongPress}
            style={[LargeHuddleListItemStyle.container, style]}
        >
            <View style={LargeHuddleListItemStyle.leftContainer}>
                <View>
                    <Text style={LargeHuddleListItemStyle.whatText}>
                        {item?.what}
                    </Text>
                    <Text style={LargeHuddleListItemStyle.whereText}>
                        {item?.where}
                    </Text>
                    <Text style={LargeHuddleListItemStyle.whenText}>
                        {item?.when}
                    </Text>
                </View>
                <View style={LargeHuddleListItemStyle.nameView}>
                    <Text style={LargeHuddleListItemStyle.nameText}>
                        {item?.name}
                    </Text>
                </View>
                {!!item?.commentsNumber && !hideCommentsNumber && (
                    <Text style={{ color: COLORS.WHITE }}>
                        {item?.commentsNumber}{' '}
                        {item?.commentsNumber > 1 ? 'comments' : 'comment'}
                    </Text>
                )}
            </View>
            <View style={LargeHuddleListItemStyle.rightContainer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPressProfilePhoto}
                >
                    <FastImage
                        source={{ uri: item?.profilePhoto }}
                        style={LargeHuddleListItemStyle.image}
                    />
                </TouchableOpacity>
                {!created && (
                    <TouchableOpacity
                        onPress={interact}
                        style={LargeHuddleListItemStyle.handView}
                    >
                        <Text style={LargeHuddleListItemStyle.handText}>
                            {interactedText}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

LargeHuddleListItem.defaultProps = LargeHuddlesListItemDefaultProps;
