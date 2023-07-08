import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ChatsItemProps } from '@components/chats/ChatsItem/ChatsItem.props';
import { ChatsItemStyle } from '@components/chats/ChatsItem/ChatsItem.style';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const ChatsItem = ({
    item,
    onPress,
    hasSeen
}: ChatsItemProps): JSX.Element => {
    const onPressItem = useCallback(() => {
        onPress(item);
    }, [item, onPress]);

    const opacityStyle = useMemo(
        (): StyleProp<TextStyle> => [
            { color: item?.isNewMessage ? COLORS.WHITE : COLORS.LIGHTGRAY_300 }
        ],
        [item?.isNewMessage]
    );

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPressItem}
            style={ChatsItemStyle.container}
        >
            <View style={ChatsItemStyle.row}>
                <View>
                    <FastImage
                        source={{ uri: item?.profilePhoto }}
                        style={ChatsItemStyle.image}
                    />
                </View>
                <View style={ChatsItemStyle.box}>
                    <View style={ChatsItemStyle.firstRow}>
                        <View style={ChatsItemStyle.nameRow}>
                            <Text style={ChatsItemStyle.name}>{item.name}</Text>
                            {item?.isNewMessage && (
                                <View style={ChatsItemStyle.dot} />
                            )}
                            {hasSeen &&
                                (item.isRead ? (
                                    <Icon
                                        name={IconEnum.SENT_BLUE}
                                        size={20}
                                        style={ChatsItemStyle.sentIcon}
                                    />
                                ) : (
                                    <Icon
                                        name={IconEnum.SENT}
                                        size={20}
                                        style={ChatsItemStyle.sentIcon}
                                    />
                                ))}
                        </View>
                        <Text style={[ChatsItemStyle.time, opacityStyle]}>
                            {getLocalTimeFromUTCUnix(item.time).format('HH:mm')}
                        </Text>
                    </View>
                    <Text style={[{ fontWeight: '500' }, opacityStyle]}>
                        {item?.lastMessage}
                    </Text>
                </View>
                {!!item.isLiked && <Text>❤️</Text>}
            </View>
        </TouchableOpacity>
    );
};
