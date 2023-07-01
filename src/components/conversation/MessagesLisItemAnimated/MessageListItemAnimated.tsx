import React, { useCallback, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Icon } from '@components/general/Icon/Icon';
import { MessageListItemAnimatedStyle } from '@components/conversation/MessagesLisItemAnimated/MessageListItemAnimated.style';
import { MessageListItemAnimatedProps } from '@components/conversation/MessagesLisItemAnimated/MessageListItemAnimated.props';

export const MessageListItemAnimated = ({
    item,
    onLongPress,
    hasSpace
}: MessageListItemAnimatedProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openPhoto = useOpenProfilePhoto();

    const isImage = !!item?.url;
    const isOutbound = item.sender === username;

    const animation = useRef(new Animated.Value(0)).current;

    const onPhotoPress = useCallback(() => {
        if (isImage) {
            openPhoto('', item?.url);
        }
    }, [isImage, item?.url, openPhoto]);

    Animated.timing(animation, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
    }).start();

    return (
        <Animated.View
            style={[
                {
                    transform: [
                        {
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [100, 0]
                            })
                        }
                    ],
                    opacity: animation
                },
                hasSpace && MessageListItemAnimatedStyle.paddingTop,
                MessageListItemAnimatedStyle.marginBottom
            ]}
        >
            <TouchableOpacity
                activeOpacity={1}
                onLongPress={onLongPress}
                onPress={onPhotoPress}
                style={[
                    MessageListItemAnimatedStyle.view,
                    isOutbound && MessageListItemAnimatedStyle.flexEnd,
                    item?.message?.length < 30 &&
                        MessageListItemAnimatedStyle.longMessage
                ]}
            >
                <Text style={MessageListItemAnimatedStyle.messageText}>
                    {item.message}
                </Text>
                <Text style={MessageListItemAnimatedStyle.timeText}>
                    {getLocalTimeFromUTCUnix(item.time).format('HH:mm')}
                </Text>
                {isOutbound &&
                    (item?.readBy?.length ? (
                        <Icon
                            name={IconEnum.SENT_BLUE}
                            size={19}
                            style={MessageListItemAnimatedStyle.sentIcon}
                        />
                    ) : (
                        <Icon
                            name={IconEnum.SENT}
                            size={19}
                            style={MessageListItemAnimatedStyle.sentIcon}
                        />
                    ))}
                {!!item?.reactions?.length && (
                    <View style={MessageListItemAnimatedStyle.reactionsView}>
                        {item.reactions.map((value: string) => (
                            <Text
                                key={value}
                                style={
                                    MessageListItemAnimatedStyle.reactionText
                                }
                            >
                                {value}
                            </Text>
                        ))}
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};
