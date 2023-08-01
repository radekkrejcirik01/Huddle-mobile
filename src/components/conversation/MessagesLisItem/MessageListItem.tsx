import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { MessageListItemProps } from '@components/conversation/MessagesLisItem/MessageListItem.props';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { MessageListItemStyle } from '@components/conversation/MessagesLisItem/MessageListItem.style';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Icon } from '@components/general/Icon/Icon';
import { LargeHuddleListItem } from '@components/huddles/LargeHuddleListItem/LargeHuddleListItem';

export const MessageListItem = ({
    item,
    onMessageLongPress,
    onHuddlePress,
    onHuddleLikePress,
    onHuddleMorePress,
    onHuddleProfilePress,
    onHuddleLongPress,
    hasSpace
}: MessageListItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openPhoto = useOpenProfilePhoto();

    const isImage = !!item?.url;
    const isOutbound = item.sender === username;

    const onPhotoPress = useCallback(() => {
        if (isImage) {
            openPhoto('', item?.url);
        }
    }, [isImage, item?.url, openPhoto]);

    if (item?.huddle) {
        return (
            <View style={MessageListItemStyle.huddleView}>
                <LargeHuddleListItem
                    item={item.huddle}
                    onProfilePress={onHuddleProfilePress}
                    onCardPress={onHuddlePress}
                    onCardLongPress={onHuddleLongPress}
                    onLikePress={onHuddleLikePress}
                    onMorePress={onHuddleMorePress}
                />
            </View>
        );
    }

    return (
        <View
            style={[
                hasSpace && MessageListItemStyle.paddingTop,
                MessageListItemStyle.marginBottom
            ]}
        >
            <TouchableOpacity
                activeOpacity={1}
                onLongPress={onMessageLongPress}
                onPress={onPhotoPress}
                style={[
                    MessageListItemStyle.view,
                    isOutbound && MessageListItemStyle.flexEnd,
                    item?.message?.length < 30 &&
                        MessageListItemStyle.longMessage,
                    isImage && MessageListItemStyle.imageView
                ]}
            >
                {isImage ? (
                    <FastImage
                        source={{ uri: item?.url }}
                        style={MessageListItemStyle.image}
                    />
                ) : (
                    <Text style={MessageListItemStyle.messageText}>
                        {item.message}
                    </Text>
                )}
                <View
                    style={[
                        MessageListItemStyle.longMessage,
                        isImage && MessageListItemStyle.imageRow
                    ]}
                >
                    <Text style={MessageListItemStyle.timeText}>
                        {getLocalTimeFromUTCUnix(item.time).format('HH:mm')}
                    </Text>
                    {isOutbound &&
                        (item?.readBy?.length ? (
                            <Icon
                                name={IconEnum.SENT_READ}
                                size={19}
                                style={MessageListItemStyle.sentIcon}
                            />
                        ) : (
                            <Icon
                                name={IconEnum.SENT}
                                size={19}
                                style={MessageListItemStyle.sentIcon}
                            />
                        ))}
                    {!!item?.reactions?.length && (
                        <View style={MessageListItemStyle.reactionsView}>
                            {item.reactions.map((value: string) => (
                                <Text
                                    key={value}
                                    style={MessageListItemStyle.reactionText}
                                >
                                    {value}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};
