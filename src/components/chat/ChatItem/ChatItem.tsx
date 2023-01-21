import React, { useMemo } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { ChatItemProps } from '@components/chat/ChatItem/ChatItem.props';
import { ChatItemStyle } from '@components/chat/ChatItem/ChatItem.style';
import { ReducerProps } from '@store/index/index.props';

export const ChatItem = ({ item }: ChatItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const isDarkMode = true;

    const isOutbound = item.sender === username;
    const renderRight = useMemo(() => isOutbound, [isOutbound]);

    const leftContainer = useMemo(
        (): StyleProp<ViewStyle> => ({
            backgroundColor: isDarkMode ? COLORS.BLACK : COLORS.MAIN_BLUE
        }),
        [isDarkMode]
    );

    const rightContainer = useMemo(
        (): StyleProp<ViewStyle> => [
            ChatItemStyle.alignFlexEnd,
            {
                backgroundColor: isDarkMode ? COLORS.MAIN_BLUE : COLORS.WHITE
            }
        ],
        [isDarkMode]
    );

    const textColor = useMemo(
        (): StyleProp<TextStyle> => ({
            color: isDarkMode ? COLORS.WHITE : COLORS.MAIN_BLUE
        }),
        [isDarkMode]
    );

    const viewStyle = useMemo(
        (): StyleProp<ViewStyle> => [
            ChatItemStyle.item,
            isDarkMode ? ChatItemStyle.darkBorder : ChatItemStyle.lightBorder,
            renderRight ? rightContainer : leftContainer
        ],
        [isDarkMode, leftContainer, rightContainer, renderRight]
    );

    const textStyle = useMemo(
        (): StyleProp<TextStyle> => [
            ChatItemStyle.text,
            renderRight && textColor
        ],
        [renderRight, textColor]
    );

    return (
        <View>
            <View style={!isOutbound && ChatItemStyle.row}>
                {!isOutbound && (
                    <FastImage
                        source={{ uri: item.profilePicture }}
                        style={ChatItemStyle.image}
                    />
                )}
                <View style={viewStyle}>
                    <Text style={textStyle}>{item.message}</Text>
                </View>
            </View>
            {!isOutbound && (
                <Text style={ChatItemStyle.senderText}>{item.sender}</Text>
            )}
            <View style={isOutbound && ChatItemStyle.readView}>
                {!!item?.readBy?.length &&
                    item?.readBy?.map((value) => {
                        if (value.username !== username) {
                            return (
                                <FastImage
                                    key={value.username}
                                    source={{ uri: value.profilePicture }}
                                    style={ChatItemStyle.readImage}
                                />
                            );
                        }
                        return null;
                    })}
            </View>
        </View>
    );
};
