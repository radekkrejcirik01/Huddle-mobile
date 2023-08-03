import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    LargeHuddleListItemProps,
    LargeHuddlesListItemDefaultProps
} from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.props';
import { LargeHuddleListItemStyle } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import COLORS from '@constants/COLORS';

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

    useEffect(() => setLiked(!!item?.liked), [item?.liked]);

    const likeAction = useCallback(() => {
        onLikePress();

        item.liked = liked ? 0 : 1;
        setLiked(!liked);
    }, [item, liked, onLikePress]);

    const removeLikeActionSheet = useCallback(() => {
        const options = ['Remove', 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 1,
                userInterfaceStyle: 'dark',
                title: 'Remove like'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    likeAction();
                }
            }
        );
    }, [likeAction, showActionSheetWithOptions]);

    const like = useCallback(() => {
        if (liked) {
            removeLikeActionSheet();
        } else {
            likeAction();
        }
    }, [likeAction, liked, removeLikeActionSheet]);

    const likedText = useMemo((): string => (liked ? '✅' : '👍'), [liked]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            disabled={!onCardPress}
            onPress={onCardPress}
            onLongPress={onCardLongPress}
            style={[LargeHuddleListItemStyle.container, style]}
        >
            <View style={LargeHuddleListItemStyle.content}>
                <View style={LargeHuddleListItemStyle.row}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onProfilePress}
                    >
                        <ProfilePhoto
                            name={item?.name}
                            photo={item?.profilePhoto}
                            size={30}
                            textBackgroundColor={COLORS.BLACK_100}
                        />
                    </TouchableOpacity>
                    <View style={LargeHuddleListItemStyle.nameView}>
                        <Text style={LargeHuddleListItemStyle.nameText}>
                            {item?.name}
                        </Text>
                    </View>
                    <IconButton
                        icon={IconEnum.MORE}
                        onPress={onMorePress}
                        size={16}
                        style={LargeHuddleListItemStyle.moreIcon}
                    />
                </View>
                <View style={LargeHuddleListItemStyle.flex}>
                    <Text style={LargeHuddleListItemStyle.messageText}>
                        {item?.message}
                    </Text>
                </View>
                <View
                    style={[
                        LargeHuddleListItemStyle.row,
                        LargeHuddleListItemStyle.flexEnd
                    ]}
                >
                    <View
                        style={[
                            LargeHuddleListItemStyle.flex,
                            LargeHuddleListItemStyle.row
                        ]}
                    >
                        <Text style={LargeHuddleListItemStyle.numberText}>
                            {item?.commentsNumber} 💬
                        </Text>
                        <Text style={LargeHuddleListItemStyle.numberText}>
                            {item?.likesNumber} 👍
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={like}
                        style={LargeHuddleListItemStyle.likeView}
                    >
                        <Text style={LargeHuddleListItemStyle.likeText}>
                            {likedText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

LargeHuddleListItem.defaultProps = LargeHuddlesListItemDefaultProps;
