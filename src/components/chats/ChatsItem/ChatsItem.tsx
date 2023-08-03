import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ChatsItemProps } from '@components/chats/ChatsItem/ChatsItem.props';
import { ChatsItemStyle } from '@components/chats/ChatsItem/ChatsItem.style';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

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

    function getNewHuddlesText(number: number): string {
        if (number === 1) {
            return `+ ${number} huddle`;
        }
        return `+ ${number} huddles`;
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPressItem}
            style={ChatsItemStyle.container}
        >
            <View style={ChatsItemStyle.row}>
                <ProfilePhoto
                    name={item.name}
                    photo={item?.profilePhoto}
                    size={55}
                />
                <View style={ChatsItemStyle.box}>
                    <View style={ChatsItemStyle.firstRow}>
                        <View style={ChatsItemStyle.nameRow}>
                            <Text style={ChatsItemStyle.name}>{item.name}</Text>
                            {item?.isNewMessage && (
                                <View style={ChatsItemStyle.dot} />
                            )}
                            {hasSeen &&
                                (item.isSeen ? (
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
                    <Text style={[ChatsItemStyle.message, opacityStyle]}>
                        {item?.lastMessage}
                    </Text>
                    {!!item.newHuddles && (
                        <View style={ChatsItemStyle.newHuddlesView}>
                            <Text style={ChatsItemStyle.newHuddlesText}>
                                {getNewHuddlesText(item.newHuddles)}
                            </Text>
                        </View>
                    )}
                </View>
                {!!item.isLiked && <Text>❤️</Text>}
            </View>
        </TouchableOpacity>
    );
};
