import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    LargeHuddleItemProps,
    LargeHuddlesListItemDefaultProps
} from '@components/huddles/LargeHuddleItem/LargeHuddleItem.props';
import { LargeHuddleItemStyle } from '@components/huddles/LargeHuddleItem/LargeHuddleItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import COLORS from '@constants/COLORS';

export const LargeHuddleItem = ({
    item,
    onCardPress,
    onProfilePress,
    onLikePress,
    onCardLongPress,
    onMorePress,
    style
}: LargeHuddleItemProps): JSX.Element => {
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

    if (item?.photo) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                disabled={!onCardPress}
                onPress={onCardPress}
                onLongPress={onCardLongPress}
                style={[LargeHuddleItemStyle.photoContainer, style]}
            >
                <FastImage
                    source={{ uri: item?.photo }}
                    style={LargeHuddleItemStyle.imageView}
                >
                    <View style={LargeHuddleItemStyle.row}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={onProfilePress}
                        >
                            <ProfilePhoto
                                name={item?.name}
                                photo={item?.profilePhoto}
                                size={32}
                                textBackgroundColor={COLORS.BLACK_100}
                            />
                        </TouchableOpacity>
                        <View style={LargeHuddleItemStyle.nameView}>
                            <Text style={LargeHuddleItemStyle.nameText}>
                                {item?.name}
                            </Text>
                        </View>
                        <IconButton
                            icon={IconEnum.MORE}
                            onPress={onMorePress}
                            size={16}
                            style={LargeHuddleItemStyle.moreIcon}
                        />
                    </View>
                    <View
                        style={[
                            LargeHuddleItemStyle.row,
                            LargeHuddleItemStyle.flexEnd
                        ]}
                    >
                        <View style={LargeHuddleItemStyle.flex}>
                            <View style={LargeHuddleItemStyle.flex}>
                                <Text
                                    style={[
                                        LargeHuddleItemStyle.messageText,
                                        item?.message &&
                                            LargeHuddleItemStyle.photoMessageText
                                    ]}
                                >
                                    {item?.message}
                                </Text>
                            </View>
                            <View
                                style={[
                                    LargeHuddleItemStyle.flex,
                                    LargeHuddleItemStyle.row
                                ]}
                            >
                                <Text style={LargeHuddleItemStyle.numberText}>
                                    {item?.commentsNumber} 💬
                                </Text>
                                <Text style={LargeHuddleItemStyle.numberText}>
                                    {item?.likesNumber} 👍
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={like}
                            style={LargeHuddleItemStyle.likeView}
                        >
                            <Text style={LargeHuddleItemStyle.likeText}>
                                {likedText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </FastImage>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            disabled={!onCardPress}
            onPress={onCardPress}
            onLongPress={onCardLongPress}
            style={[LargeHuddleItemStyle.container, style]}
        >
            <View style={LargeHuddleItemStyle.content}>
                <View style={LargeHuddleItemStyle.row}>
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
                    <View style={LargeHuddleItemStyle.nameView}>
                        <Text style={LargeHuddleItemStyle.nameText}>
                            {item?.name}
                        </Text>
                    </View>
                    <IconButton
                        icon={IconEnum.MORE}
                        onPress={onMorePress}
                        size={16}
                        style={LargeHuddleItemStyle.moreIcon}
                    />
                </View>
                <View style={LargeHuddleItemStyle.flex}>
                    <Text style={LargeHuddleItemStyle.messageText}>
                        {item?.message}
                    </Text>
                </View>
                <View
                    style={[
                        LargeHuddleItemStyle.row,
                        LargeHuddleItemStyle.flexEnd
                    ]}
                >
                    <View
                        style={[
                            LargeHuddleItemStyle.flex,
                            LargeHuddleItemStyle.row
                        ]}
                    >
                        <Text style={LargeHuddleItemStyle.numberText}>
                            {item?.commentsNumber} 💬
                        </Text>
                        <Text style={LargeHuddleItemStyle.numberText}>
                            {item?.likesNumber} 👍
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={like}
                        style={LargeHuddleItemStyle.likeView}
                    >
                        <Text style={LargeHuddleItemStyle.likeText}>
                            {likedText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

LargeHuddleItem.defaultProps = LargeHuddlesListItemDefaultProps;