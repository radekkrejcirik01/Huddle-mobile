import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Alert,
    StyleProp,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import {
    State,
    TapGestureHandler,
    TapGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import COLORS from '@constants/COLORS';
import {
    ConversationItemProps,
    ReactionsInterface
} from '@components/conversation/ConversationItem/ConversationItem.props';
import { ConversationItemStyle } from '@components/conversation/ConversationItem/ConversationItem.style';
import { ReducerProps } from '@store/index/index.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { MessageReactInterface } from '@interfaces/post/Post.inteface';
import { useModal } from '@hooks/useModal';
import { Modal } from '@components/general/Modal/Modal';
import { ReactionsContent } from '@components/conversation/ReactionsContent/ReactionsContent';
import { useOpenPhoto } from '@hooks/useOpenPhoto';

export const ConversationItem = ({
    item
}: ConversationItemProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const { conversationId } = useSelector(
        (state: ReducerProps) => state.conversation
    );
    const { modalVisible, showModal, hideModal } = useModal();
    const openPhoto = useOpenPhoto();

    const { showActionSheetWithOptions } = useActionSheet();

    const isDarkMode = true;

    const [reactions, setReactions] = useState<Array<ReactionsInterface>>();
    const [reactionsText, setReactionsText] = useState<string>();

    const isImage = !!item?.url;
    const isOutbound = item.sender === username;
    const renderRight = useMemo(() => isOutbound, [isOutbound]);

    useEffect(() => {
        const reactionsValue = reactions || item.reactedBy || [];
        setReactions(reactionsValue);

        let numberOfLikes = 0;
        let numberOfLoves = 0;
        for (let i = 0; i < reactionsValue.length; i += 1) {
            if (reactionsValue[i].reaction === '👍') {
                numberOfLikes += 1;
            } else {
                numberOfLoves += 1;
            }
        }

        if (!!numberOfLikes && !numberOfLoves) {
            if (numberOfLikes > 1) {
                setReactionsText(`👍${numberOfLikes}`);
            } else {
                setReactionsText('👍');
            }
        }
        if (!numberOfLikes && !!numberOfLoves) {
            if (numberOfLoves > 1) {
                setReactionsText(`❤️${numberOfLoves}`);
            } else {
                setReactionsText('❤️');
            }
        }
        if (!!numberOfLikes && !!numberOfLoves) {
            if (numberOfLikes > 1 && numberOfLoves > 1) {
                setReactionsText(`❤️${numberOfLoves} 👍${numberOfLikes}`);
            }
            if (numberOfLikes > 1 && numberOfLoves === 1) {
                setReactionsText(`❤ 👍${numberOfLikes}️`);
            }
            if (numberOfLikes === 1 && numberOfLoves > 1) {
                setReactionsText(`❤${numberOfLoves} 👍️`);
            }
            if (numberOfLikes === 1 && numberOfLoves === 1) {
                setReactionsText(`❤️ 👍`);
            }
        }
    }, [item.reactedBy, reactions]);

    const leftContainer = useMemo(
        (): StyleProp<ViewStyle> => ({
            backgroundColor: isDarkMode ? COLORS.BLACK : COLORS.MAIN_BLUE
        }),
        [isDarkMode]
    );

    const rightContainer = useMemo(
        (): StyleProp<ViewStyle> => [
            ConversationItemStyle.alignFlexEnd,
            {
                backgroundColor: isDarkMode ? COLORS.MAIN_BLUE : COLORS.WHITE
            }
        ],
        [isDarkMode]
    );

    const textColor = useMemo(
        (): StyleProp<TextStyle> => ({
            color: isDarkMode ? COLORS.WHITE : COLORS.MAIN_BLUE
        }),
        [isDarkMode]
    );

    const viewStyle = useMemo(
        (): StyleProp<ViewStyle> => [
            ConversationItemStyle.item,
            isDarkMode
                ? ConversationItemStyle.darkBorder
                : ConversationItemStyle.lightBorder,
            renderRight ? rightContainer : leftContainer,
            item?.url && {
                padding: 0,
                paddingHorizontal: 0
            }
        ],
        [isDarkMode, renderRight, rightContainer, leftContainer, item?.url]
    );

    const textStyle = useMemo(
        (): StyleProp<TextStyle> => [
            ConversationItemStyle.text,
            renderRight && textColor
        ],
        [renderRight, textColor]
    );

    const performLike = useCallback(
        (value = '❤️') => {
            for (let i = 0; i < reactions.length; i += 1) {
                if (
                    reactions[i].username === username &&
                    reactions[i].reaction === value.toString()
                ) {
                    return;
                }
            }
            setReactions([
                ...reactions,
                { username, reaction: value.toString() }
            ]);
            postRequest<ResponseInterface, MessageReactInterface>(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/react/message',
                {
                    username,
                    conversationId,
                    messageId: item?.id,
                    reaction: value.toString()
                }
            ).subscribe();
        },
        [conversationId, item?.id, reactions, username]
    );

    const showOutboundActionSheet = useCallback(() => {
        if (isImage) {
            return;
        }

        const options = ['Copy', 'Cancel'];
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 1,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    Clipboard.setString(item?.message);
                }
            }
        );
    }, [isImage, item?.message, showActionSheetWithOptions]);

    const showInboundActionSheet = useCallback(() => {
        const options = [
            'React ❤',
            'React 👍',
            !isImage && 'Copy',
            'Report',
            'Cancel'
        ].filter(Boolean);

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: options?.length - 1,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    performLike();
                }
                if (selectedIndex === 1) {
                    performLike('👍');
                }
                if (selectedIndex === options.indexOf('Copy')) {
                    Clipboard.setString(item?.message);
                }
                if (selectedIndex === options.indexOf('Report')) {
                    Alert.alert(
                        'Thank you for reporting this message. Our team will take a look 🙂'
                    );
                }
            }
        );
    }, [isImage, item?.message, performLike, showActionSheetWithOptions]);

    const onPhotoPress = useCallback(() => {
        if (isImage) {
            openPhoto(item?.url);
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
                performLike();
            }
        },
        [isImage, isOutbound, performLike]
    );

    return (
        <View>
            <View style={!isOutbound && ConversationItemStyle.row}>
                {!isOutbound && (
                    <FastImage
                        source={{ uri: item.profilePicture }}
                        style={ConversationItemStyle.profilePicture}
                    />
                )}
                {(item?.message || item?.url) && (
                    <TouchableOpacity
                        activeOpacity={1}
                        onLongPress={
                            isOutbound
                                ? showOutboundActionSheet
                                : showInboundActionSheet
                        }
                        onPress={onPhotoPress}
                        style={viewStyle}
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
                                        style={ConversationItemStyle.image}
                                    />
                                ) : (
                                    <Text style={textStyle}>
                                        {item.message}
                                    </Text>
                                )}
                            </View>
                        </TapGestureHandler>
                    </TouchableOpacity>
                )}
            </View>
            {!isOutbound && (
                <Text style={ConversationItemStyle.senderText}>
                    {item.sender}
                </Text>
            )}
            {!!reactionsText && (
                <TouchableOpacity
                    onPress={showModal}
                    style={[
                        isOutbound
                            ? ConversationItemStyle.alignFlexEnd
                            : ConversationItemStyle.alignFlexStart
                    ]}
                >
                    <Animatable.Text
                        animation="bounceIn"
                        style={ConversationItemStyle.reactionText}
                    >
                        {reactionsText}
                    </Animatable.Text>
                </TouchableOpacity>
            )}
            <View style={isOutbound && ConversationItemStyle.readView}>
                {!!item?.readBy?.length &&
                    item?.readBy?.map((value) => {
                        if (value.username !== username) {
                            return (
                                <FastImage
                                    key={value.username}
                                    source={{ uri: value.profilePicture }}
                                    style={ConversationItemStyle.readImage}
                                />
                            );
                        }
                        return null;
                    })}
            </View>
            <Modal
                isVisible={modalVisible}
                content={<ReactionsContent values={reactions} />}
                style={ConversationItemStyle.modal}
                onClose={hideModal}
            />
        </View>
    );
};
