import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getHuddleColor } from '@hooks/getHuddleColor';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    LargeHuddleListItemProps,
    LargeHuddlesListItemDefaultProps
} from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.props';
import { LargeHuddleListItemStyle } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';

export const LargeHuddleListItem = ({
    item,
    onCardPress,
    onProfilePress,
    onLikePress,
    onCardLongPress,
    onMorePress,
    style
}: LargeHuddleListItemProps): JSX.Element => {
    const [liked, setLiked] = useState<boolean>();

    const { showActionSheetWithOptions } = useActionSheet();
    const { primaryColor, secondaryColor } = getHuddleColor(item.color);

    useEffect(() => setLiked(!!item?.liked), [item?.liked]);

    const interactAction = useCallback(() => {
        onLikePress();

        item.liked = liked ? 0 : 1;
        setLiked(!liked);
    }, [item, liked, onLikePress]);

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
        if (liked) {
            removeInteractionActionSheet();
        } else {
            interactAction();
        }
    }, [interactAction, liked, removeInteractionActionSheet]);

    const likedText = useMemo((): string => (liked ? '✅' : '👍'), [liked]);

    function getCommentsText(commentsNumber: number): string {
        if (commentsNumber === 1) {
            return 'comment';
        }
        return 'comments';
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            disabled={!onCardPress}
            onPress={onCardPress}
            onLongPress={onCardLongPress}
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
                            onPress={onProfilePress}
                        >
                            <ProfilePhoto
                                name={item.name}
                                photo={item?.profilePhoto}
                                size={55}
                                textBackgroundColor={secondaryColor}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={LargeHuddleListItemStyle.titleView}>
                        <Text style={LargeHuddleListItemStyle.titleText}>
                            {item?.name}
                        </Text>
                        <Text style={LargeHuddleListItemStyle.topicText}>
                            {item.message}
                        </Text>
                    </View>
                    <IconButton
                        icon={IconEnum.MORE}
                        onPress={onMorePress}
                        size={16}
                        style={LargeHuddleListItemStyle.moreIcon}
                    />
                </View>
                <View
                    style={[
                        LargeHuddleListItemStyle.row,
                        LargeHuddleListItemStyle.flexEnd
                    ]}
                >
                    <Text style={LargeHuddleListItemStyle.commentsText}>
                        {item?.commentsNumber}{' '}
                        {getCommentsText(item?.commentsNumber)}
                    </Text>
                    <View style={LargeHuddleListItemStyle.flex}>
                        <TouchableOpacity
                            onPress={interact}
                            style={[
                                LargeHuddleListItemStyle.handView,
                                { backgroundColor: secondaryColor }
                            ]}
                        >
                            <Text style={LargeHuddleListItemStyle.handText}>
                                {likedText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

LargeHuddleListItem.defaultProps = LargeHuddlesListItemDefaultProps;
