import React, { useMemo } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { ChatItemProps } from '@components/chat/ChatItem/ChatItem.props';
import { ChatItemStyle } from '@components/chat/ChatItem/ChatItem.style';

export const ChatItem = ({
    isOutbound,
    message,
    sender,
    profilePicture
}: ChatItemProps): JSX.Element => {
    const isDarkMode = true;
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
            <View style={viewStyle}>
                <FastImage
                    source={{ uri: profilePicture }}
                    style={{ width: 20, height: 20, borderRadius: 10 }}
                />
                <Text style={textStyle}>{message}</Text>
            </View>
            {!isOutbound && <Text style={textStyle}>{sender}</Text>}
        </View>
    );
};
