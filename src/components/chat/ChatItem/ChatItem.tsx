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
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { ChatItemProps } from '@components/chat/ChatItem/ChatItem.props';
import { ChatItemStyle } from '@components/chat/ChatItem/ChatItem.style';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const ChatItem = ({ item }: ChatItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const navigation = useNavigation();

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
            renderRight ? rightContainer : leftContainer,
            item?.url && { padding: 0, paddingHorizontal: 0 }
        ],
        [isDarkMode, renderRight, rightContainer, leftContainer, item?.url]
    );

    const textStyle = useMemo(
        (): StyleProp<TextStyle> => [
            ChatItemStyle.text,
            renderRight && textColor
        ],
        [renderRight, textColor]
    );

    const showActionSheet = useCallback(() => {
        const options = ['Copy', !isOutbound && 'Report', 'Cancel'].filter(
            Boolean
        );

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: isOutbound ? 1 : 2,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    Clipboard.setString(item?.message);
                }
                if (!isOutbound && selectedIndex === 1) {
                    Alert.alert(
                        'Thank you for reporting this message. Our team will take a look 🙂'
                    );
                }
            }
        );
    }, [isOutbound, item?.message, showActionSheetWithOptions]);

    const onPhotoPress = useCallback(
        (picture) => {
            navigation.navigate(
                AccountStackNavigatorEnum.PictureScreen as never,
                {
                    picture
                } as never
            );
        },
        [navigation]
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
                {(item?.message || item?.url) && (
                    <TouchableOpacity
                        activeOpacity={1}
                        onLongPress={showActionSheet}
                        onPress={() => item?.url && onPhotoPress(item?.url)}
                        style={viewStyle}
                    >
                        {item?.url ? (
                            <FastImage
                                source={{ uri: item.url }}
                                style={{
                                    width: 175,
                                    height: 175,
                                    borderRadius: 15
                                }}
                            />
                        ) : (
                            <Text style={textStyle}>{item.message}</Text>
                        )}
                    </TouchableOpacity>
                )}
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
