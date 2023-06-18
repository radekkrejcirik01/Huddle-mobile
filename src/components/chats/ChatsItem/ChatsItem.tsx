import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ChatsItemProps } from '@components/chats/ChatsItem/ChatsItem.props';
import { ChatsItemStyle } from '@components/chats/ChatsItem/ChatsItem.style';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';

export const ChatsItem = ({ item, onPress }: ChatsItemProps): JSX.Element => {
    const onPressItem = useCallback(() => {
        onPress(item);
    }, [item, onPress]);

    const opacityStyle = useMemo(
        (): StyleProp<TextStyle> => [
            { color: item?.isRead ? COLORS.LIGHTGRAY_300 : COLORS.WHITE }
        ],
        [item?.isRead]
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
                        <Text style={ChatsItemStyle.name}>{item.name}</Text>
                        <Text style={[ChatsItemStyle.time, opacityStyle]}>
                            {getLocalTimeFromUTCUnix(item.time).format('HH:mm')}
                        </Text>
                    </View>
                    <Text style={[ChatsItemStyle.message, opacityStyle]}>
                        {item?.lastMessage}
                    </Text>
                </View>
                {!!item.isLiked && <Text>❤️</Text>}
            </View>
        </TouchableOpacity>
    );
};
