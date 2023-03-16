import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { MessagesItemProps } from '@components/messages/MessagesItem/MessagesItem.props';
import { MessagesItemStyle } from '@components/messages/MessagesItem/MessagesItem.style';
import COLORS from '@constants/COLORS';
import { SwipeableView } from '@components/general/SwipeableView/SwipeableView';
import { getLocalDateTimeFromUTC } from '@functions/getLocalDateTimeFromUTC';
import { TypingIndicator } from '@components/general/TypingIndicator/TypingIndicator';
import { TypingIndicatorEnum } from '@components/general/TypingIndicator/TypingIndicator.enum';

export const MessagesItem = ({
    item,
    onPress,
    onDelete
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

    const Title = useCallback((): JSX.Element => {
        if (item?.type === 'group' && !item?.name) {
            return (
                <View style={MessagesItemStyle.titleRow}>
                    {item?.usernames.map((value) => (
                        <View
                            key={value.username}
                            style={MessagesItemStyle.row}
                        >
                            <FastImage
                                source={{ uri: value?.profilePicture }}
                                style={MessagesItemStyle.titleImage}
                            />
                            <Text style={MessagesItemStyle.titleText}>
                                {value?.firstname}
                            </Text>
                        </View>
                    ))}
                </View>
            );
        }
        return <Text style={MessagesItemStyle.text}>{item?.name}</Text>;
    }, [item?.name, item?.type, item?.usernames]);

    return (
        <SwipeableView onDelete={() => onDelete(item.id)}>
            <TouchableOpacity
                activeOpacity={1}
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
                            <Title />
                            <Text
                                style={[MessagesItemStyle.text, opacityStyle]}
                            >
                                {moment(
                                    getLocalDateTimeFromUTC(item.time)
                                ).fromNow()}
                            </Text>
                        </View>
                        <Text style={[MessagesItemStyle.message, opacityStyle]}>
                            {item.message}
                        </Text>
                        <TypingIndicator
                            conversationId={item?.id}
                            type={TypingIndicatorEnum.Messages}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </SwipeableView>
    );
};
