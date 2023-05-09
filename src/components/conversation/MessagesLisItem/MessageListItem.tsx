import React, { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import FastImage from 'react-native-fast-image';
import {
    State,
    TapGestureHandler,
    TapGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { MessageListItemProps } from '@components/conversation/MessagesLisItem/MessageListItem.props';
import { MessageListItemStyle } from '@components/conversation/MessagesLisItem/MessageListItem.style';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';

export const MessageListItem = ({
    item
}: MessageListItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openPhoto = useOpenProfilePhoto();
    const { showActionSheetWithOptions } = useActionSheet();

    const isImage = !!item?.url;
    const isOutbound = item.sender === username;

    const showActionSheet = useCallback(() => {
        const options = [!isImage && 'Copy', 'Report', 'Cancel'].filter(
            Boolean
        );

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 2,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    Clipboard.setString(item?.message);
                }
                if (selectedIndex === 1) {
                    Alert.alert(
                        'Thank you for reporting. Our team will take a look 🙂'
                    );
                }
            }
        );
    }, [isImage, item?.message, showActionSheetWithOptions]);

    const onPhotoPress = useCallback(() => {
        if (isImage) {
            openPhoto('', item?.url);
        }
    }, [isImage, item?.url, openPhoto]);

    const onDoubleTap = useCallback(
        (event: TapGestureHandlerGestureEvent) => {
            // Trigger like event when there is no picture
            if (
                !isOutbound &&
                !isImage &&
                event.nativeEvent.state === State.ACTIVE
            ) {
                Alert.alert('double tap');
            }
        },
        [isImage, isOutbound]
    );

    return (
        <View
            style={[
                MessageListItemStyle.container,
                isOutbound && MessageListItemStyle.outboundView
            ]}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPhotoPress}
                onLongPress={showActionSheet}
                style={[
                    MessageListItemStyle.messageView,
                    isOutbound
                        ? MessageListItemStyle.outboundMessageColor
                        : MessageListItemStyle.inboundMessageColor,
                    item?.url && MessageListItemStyle.imageView
                ]}
            >
                <TapGestureHandler
                    onHandlerStateChange={onDoubleTap}
                    numberOfTaps={2}
                    maxDurationMs={200}
                >
                    <View>
                        {item?.url ? (
                            <FastImage
                                source={{ uri: item.url }}
                                style={MessageListItemStyle.image}
                            />
                        ) : (
                            <Text style={MessageListItemStyle.messageText}>
                                {item.message}
                            </Text>
                        )}
                    </View>
                </TapGestureHandler>
            </TouchableOpacity>
            <Text style={MessageListItemStyle.timeText}>
                {getLocalTimeFromUTCUnix(item?.time).fromNow()}
            </Text>
        </View>
    );
};
