import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ChatsItemProps } from '@components/chats/ChatsItem/ChatsItem.props';
import { ChatsItemStyle } from '@components/chats/ChatsItem/ChatsItem.style';
import COLORS from '@constants/COLORS';
import { SwipeableView } from '@components/general/SwipeableView/SwipeableView';
import { getLocalDateTimeFromUTC } from '@functions/getLocalDateTimeFromUTC';
import { TypingIndicator } from '@components/general/TypingIndicator/TypingIndicator';
import { TypingIndicatorEnum } from '@components/general/TypingIndicator/TypingIndicator.enum';

export const ChatsItem = ({
    item,
    onPress,
    onDelete
}: ChatsItemProps): JSX.Element => {
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
                <View style={ChatsItemStyle.titleRow}>
                    {item?.usernames.map((value) => (
                        <View key={value.username} style={ChatsItemStyle.row}>
                            <FastImage
                                source={{ uri: value?.profilePicture }}
                                style={ChatsItemStyle.titleImage}
                            />
                            <Text style={ChatsItemStyle.titleText}>
                                {value?.firstname}
                            </Text>
                        </View>
                    ))}
                </View>
            );
        }
        return <Text style={ChatsItemStyle.text}>{item?.name}</Text>;
    }, [item?.name, item?.type, item?.usernames]);

    return (
        <SwipeableView onDelete={() => onDelete(item.id)}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPressItem}
                style={ChatsItemStyle.container}
            >
                <View style={ChatsItemStyle.row}>
                    <View>
                        <FastImage
                            source={{ uri: item.picture }}
                            style={ChatsItemStyle.image}
                        />
                    </View>
                    <View style={ChatsItemStyle.box}>
                        <View style={ChatsItemStyle.firstRow}>
                            <Title />
                            <Text style={[ChatsItemStyle.text, opacityStyle]}>
                                {moment(
                                    getLocalDateTimeFromUTC(item.time)
                                ).fromNow()}
                            </Text>
                        </View>
                        <Text style={[ChatsItemStyle.message, opacityStyle]}>
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
