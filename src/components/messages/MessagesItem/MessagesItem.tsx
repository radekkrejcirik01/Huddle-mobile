import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { MessagesItemProps } from '@components/messages/MessagesItem/MessagesItem.props';
import { MessagesItemStyle } from '@components/messages/MessagesItem/MessagesItem.style';
import COLORS from '@constants/COLORS';

export const MessagesItem = ({
    item,
    onPress
}: MessagesItemProps): JSX.Element => {
    const onPressItem = useCallback(() => {
        onPress(item);
    }, [item, onPress]);

    const opacityStyle = useMemo(
        (): StyleProp<TextStyle> => [
            { color: item.isRead ? COLORS.LIGHTGRAY_300 : COLORS.WHITE }
        ],
        [item.isRead]
    );

    return (
        <TouchableOpacity
            onPress={onPressItem}
            style={MessagesItemStyle.container}
        >
            <View style={MessagesItemStyle.row}>
                <View>
                    <FastImage
                        source={{ uri: item.picture }}
                        style={MessagesItemStyle.image}
                    />
                </View>
                <View style={MessagesItemStyle.box}>
                    <View style={MessagesItemStyle.firstRow}>
                        <Text style={MessagesItemStyle.text}>{item.name}</Text>
                        <Text style={[MessagesItemStyle.text, opacityStyle]}>
                            {moment(item.time).fromNow()}
                        </Text>
                    </View>
                    <Text style={[MessagesItemStyle.message, opacityStyle]}>
                        {item.message}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
