import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getHuddleColor } from '@hooks/getHuddleColor';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    LargeHuddleListItemProps,
    LargeHuddlesListItemDefaultProps
} from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.props';
import { LargeHuddleListItemStyle } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.style';

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
    const { primaryColor, secondaryColor } = getHuddleColor(item.color);

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
                title: 'Remove interaction'
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
            style={[
                LargeHuddleListItemStyle.container,
                { backgroundColor: primaryColor },
                style
            ]}
        >
            <View style={LargeHuddleListItemStyle.content}>
                <View style={LargeHuddleListItemStyle.row}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={onPressProfilePhoto}
                        >
                            <FastImage
                                source={{ uri: item?.profilePhoto }}
                                style={LargeHuddleListItemStyle.image}
                            />
                        </TouchableOpacity>
                        <View style={LargeHuddleListItemStyle.nameView}>
                            <Text
                                style={LargeHuddleListItemStyle.nameText}
                                adjustsFontSizeToFit
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </View>
                    <View style={LargeHuddleListItemStyle.whatView}>
                        <Text
                            style={LargeHuddleListItemStyle.whatText}
                            adjustsFontSizeToFit
                        >
                            {item?.what}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        LargeHuddleListItemStyle.row,
                        LargeHuddleListItemStyle.flexEnd
                    ]}
                >
                    {!!item?.commentsNumber && !hideCommentsNumber && (
                        <Text style={LargeHuddleListItemStyle.commentsText}>
                            {item?.commentsNumber}{' '}
                            {item?.commentsNumber > 1 ? 'comments' : 'comment'}
                        </Text>
                    )}
                    {!created && (
                        <View style={LargeHuddleListItemStyle.flex}>
                            <TouchableOpacity
                                onPress={interact}
                                style={[
                                    LargeHuddleListItemStyle.handView,
                                    { backgroundColor: secondaryColor }
                                ]}
                            >
                                <Text style={LargeHuddleListItemStyle.handText}>
                                    {interactedText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

LargeHuddleListItem.defaultProps = LargeHuddlesListItemDefaultProps;
