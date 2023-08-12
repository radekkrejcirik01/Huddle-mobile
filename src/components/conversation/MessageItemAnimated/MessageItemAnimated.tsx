import React, { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { MessageItemAnimatedStyle } from '@components/conversation/MessageItemAnimated/MessageItemAnimated.style';
import { MessageItemAnimatedProps } from '@components/conversation/MessageItemAnimated/MessageItemAnimated.props';
import { MessageItemStatus } from '@components/conversation/MessageItemStatus/MessageItemStatus';

export const MessageItemAnimated = ({
    item,
    hasSpace
}: MessageItemAnimatedProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const isOutbound = item.sender === username;
    const isShortMessage = item?.message?.length < 30;
    const isReply = item?.replyMessage || item?.replyPhoto;

    const animation = useRef(new Animated.Value(0)).current;

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
                MessageItemAnimatedStyle.container,
                isOutbound && MessageItemAnimatedStyle.flexEnd,
                hasSpace && MessageItemAnimatedStyle.space
            ]}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={[
                    MessageItemAnimatedStyle.messageView,
                    isOutbound && MessageItemAnimatedStyle.outbound
                ]}
            >
                <View>
                    {isReply && (
                        <View
                            style={[
                                item?.replyMessage?.length < 20 &&
                                    MessageItemAnimatedStyle.row,
                                MessageItemAnimatedStyle.paddingBottom
                            ]}
                        >
                            {item?.replyPhoto && (
                                <FastImage
                                    source={{ uri: item?.replyPhoto }}
                                    style={MessageItemAnimatedStyle.replyPhoto}
                                />
                            )}
                            <Text
                                style={
                                    MessageItemAnimatedStyle.replyMessageText
                                }
                            >
                                {item?.replyMessage}
                            </Text>
                        </View>
                    )}
                    <View
                        style={[
                            MessageItemAnimatedStyle.justifyContent,
                            isShortMessage && MessageItemAnimatedStyle.row
                        ]}
                    >
                        <Text style={MessageItemAnimatedStyle.messageText}>
                            {item.message}
                        </Text>
                        <MessageItemStatus
                            item={item}
                            isOutbound={isOutbound}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};
