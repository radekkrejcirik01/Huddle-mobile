import React from 'react';
import { Text, View } from 'react-native';
import { useTypingIndicator } from '@hooks/useTypingIndicator';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ChatItemProps } from '@components/chats/ChatItem/ChatItem.props';
import { ChatItemStyle } from '@components/chats/ChatItem/ChatItem.style';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const ChatItem = ({
    item,
    onPress,
    onLongPress,
    hasSeen
}: ChatItemProps): JSX.Element => {
    const { isTyping } = useTypingIndicator(item.id);

    function getNewHuddlesText(number: number): string {
        if (number === 1) {
            return `+ ${number} leaf`;
        }
        return `+ ${number} leafs`;
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            onLongPress={onLongPress}
            style={ChatItemStyle.container}
        >
            <View style={ChatItemStyle.row}>
                <ProfilePhoto
                    name={item.name}
                    photo={item?.profilePhoto}
                    size={50}
                />
                <View style={ChatItemStyle.box}>
                    <View style={ChatItemStyle.firstRow}>
                        <View style={ChatItemStyle.nameRow}>
                            {item?.isNewMessage && (
                                <View style={ChatItemStyle.dot} />
                            )}
                            <Text style={ChatItemStyle.nameText}>
                                {item.name}
                            </Text>
                            {hasSeen &&
                                (item.isSeen ? (
                                    <Icon
                                        name={IconEnum.SENT_BLUE}
                                        size={20}
                                        style={ChatItemStyle.sentIcon}
                                    />
                                ) : (
                                    <Icon
                                        name={IconEnum.SENT}
                                        size={20}
                                        style={ChatItemStyle.sentIcon}
                                    />
                                ))}
                            {!!item.newHuddles && (
                                <View style={ChatItemStyle.newHuddlesView}>
                                    <Text style={ChatItemStyle.newHuddlesText}>
                                        {getNewHuddlesText(item.newHuddles)}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <Text
                            style={[
                                ChatItemStyle.timeText,
                                item?.isNewMessage &&
                                    ChatItemStyle.newMessageText
                            ]}
                        >
                            {getLocalTimeFromUTCUnix(item.time).format('HH:mm')}
                        </Text>
                    </View>
                    <Text
                        style={[
                            ChatItemStyle.messageText,
                            item?.isNewMessage && ChatItemStyle.newMessageText
                        ]}
                    >
                        {isTyping ? 'is typing...' : item?.lastMessage}
                    </Text>
                </View>
                {!!item.isLiked && <Text>❤️</Text>}
            </View>
        </TouchableOpacity>
    );
};
