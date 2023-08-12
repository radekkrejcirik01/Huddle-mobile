import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { MessageItemProps } from '@components/conversation/MessageItem/MessageItem.props';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { MessageItemStyle } from '@components/conversation/MessageItem/MessageItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { MessageItemStatus } from '@components/conversation/MessageItemStatus/MessageItemStatus';

export const MessageItem = ({
    item,
    name,
    profilePhoto,
    onMessageLongPress,
    hasSpace,
    hasProfilePhoto
}: MessageItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const isOutbound = item.sender === username;
    const isShortMessage = item?.message?.length < 30;
    const isReply = item?.replyMessage || item?.replyPhoto;

    return (
        <View
            style={[
                MessageItemStyle.container,
                isOutbound && MessageItemStyle.flexEnd,
                hasSpace && MessageItemStyle.space
            ]}
        >
            {!isOutbound &&
                (hasProfilePhoto ? (
                    <ProfilePhoto
                        name={name}
                        photo={profilePhoto}
                        size={35}
                        style={MessageItemStyle.marginRight}
                    />
                ) : (
                    <View style={MessageItemStyle.width} />
                ))}
            <TouchableOpacity
                activeOpacity={1}
                onLongPress={onMessageLongPress}
                style={[
                    MessageItemStyle.messageView,
                    isOutbound && MessageItemStyle.outbound
                ]}
            >
                <View>
                    {isReply && (
                        <View
                            style={[
                                item?.replyMessage?.length < 20 &&
                                    MessageItemStyle.row,
                                MessageItemStyle.paddingBottom
                            ]}
                        >
                            {item?.replyPhoto && (
                                <FastImage
                                    source={{ uri: item?.replyPhoto }}
                                    style={MessageItemStyle.replyPhoto}
                                />
                            )}
                            <Text style={MessageItemStyle.replyMessageText}>
                                {item?.replyMessage}
                            </Text>
                        </View>
                    )}
                    <View
                        style={[
                            MessageItemStyle.justifyContent,
                            isShortMessage && MessageItemStyle.row
                        ]}
                    >
                        <Text style={MessageItemStyle.messageText}>
                            {item.message}
                        </Text>
                        <MessageItemStatus
                            item={item}
                            isOutbound={isOutbound}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
