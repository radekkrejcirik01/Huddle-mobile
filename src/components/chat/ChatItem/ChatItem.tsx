import React, { useCallback, useMemo } from 'react';
import {
    Alert,
    StyleProp,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { ChatItemProps } from '@components/chat/ChatItem/ChatItem.props';
import { ChatItemStyle } from '@components/chat/ChatItem/ChatItem.style';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const ChatItem = ({ item }: ChatItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { showActionSheetWithOptions } = useActionSheet();

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

    const showActionSheet = useCallback(() => {
        const options = ['Copy', 'Report', 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 2,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    Clipboard.setString(item?.message);
                }
                if (selectedIndex === 1) {
                    Alert.alert(
                        'Thank you for reporting this message. Our team will take a look 🙂'
                    );
                }
            }
        );
    }, [item?.message, showActionSheetWithOptions]);

    return (
        <View activeOpacity={1} onLongPress={showActionSheet}>
            <View style={!isOutbound && ChatItemStyle.row}>
                {!isOutbound && (
                    <FastImage
                        source={{ uri: item.profilePicture }}
                        style={ChatItemStyle.image}
                    />
                )}
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={showActionSheet}
                    style={viewStyle}
                >
                    <Text style={textStyle}>{item.message}</Text>
                </TouchableOpacity>
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
