import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    TextInput,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import {
    useFocusEffect,
    useIsFocused,
    useNavigation as useDefaultNavigation
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { useModal } from '@hooks/useModal';
import { useRenderMesages } from '@hooks/useRenderMesages';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import {
    ConversationScreenProps,
    HuddleItemInterface,
    MessageProps
} from '@screens/account/ConversationScreen/ConversationScreen.props';
import { ConversationScreenStyle } from '@screens/account/ConversationScreen/ConversationScreen.style';
import {
    getRequestUser,
    postRequestUser,
    putRequestUser
} from '@utils/Axios/Axios.service';
import {
    MessagesByUsernamesResponseInterface,
    MessagesResponseInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ChatInput } from '@components/conversation/ChatInput/ChatInput';
import {
    CreateConversationPostInterface,
    LastReadMessagePostInterface,
    MessagePostInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { isiOS } from '@functions/checking-functions';
import { ConversationHeader } from '@components/conversation/ConversationHeader/ConversationHeader';
import { PostHuddleButton } from '@components/huddles/PostHuddleButton/PostHuddleButton';
import { Modal } from '@components/general/Modal/Modal';
import { HuddleLikesModal } from '@components/huddles/HuddleLikesModal/HuddleLikesModal';

export const ConversationScreen = ({
    route
}: ConversationScreenProps): JSX.Element => {
    const { conversationId, name, profilePhoto, username } = route.params;

    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const navigation = useDefaultNavigation();
    const { bottom } = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<Array<MessageProps>>([]);
    const [refreshList, setRefreshList] = useState<boolean>(false);
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [replyMessage, setReplyMessage] = useState<string>();
    const [replyPhoto, setReplyPhoto] = useState<string>();
    const [huddleId, setHuddleId] = useState<number>();

    const interval = useRef(null);
    const loadMessagesEnabled = useRef<boolean>(true);
    const input = useRef<TextInput>(null);

    const updateLastRead = (idConversation: number) => {
        if (idConversation) {
            putRequestUser<ResponseInterface, LastReadMessagePostInterface>(
                'last-seen',
                {
                    conversationId: idConversation
                }
            ).subscribe();
        }
    };

    const loadMessages = useCallback(
        (lastId?: number) => {
            if (loadMessagesEnabled.current) {
                let endpoint = `conversation/${conversationId}`;
                if (lastId) {
                    clearInterval(interval.current);
                    endpoint += `/${lastId}`;
                }

                getRequestUser<MessagesResponseInterface>(endpoint).subscribe(
                    (response: MessagesResponseInterface) => {
                        if (response?.status) {
                            if (!lastId) {
                                if (response?.data?.length) {
                                    updateLastRead(conversationId);
                                }

                                setMessages(response?.data);
                                return;
                            }

                            if (lastId && !!response?.data?.length) {
                                setMessages((value) =>
                                    value.concat(response?.data)
                                );
                            }
                        }
                    }
                );
            }
        },
        [conversationId]
    );

    useEffect(
        () =>
            navigation.setOptions({
                ...(conversationId && {
                    headerLeft: () => (
                        <ConversationHeader
                            conversationId={conversationId}
                            name={name}
                            profilePhoto={profilePhoto}
                        />
                    )
                }),
                headerRight: () => (
                    <PostHuddleButton onCreateHuddle={loadMessages} />
                ),
                headerStyle: [
                    ConversationScreenStyle.headerStyle,
                    !!bottom && ConversationScreenStyle.headerHeight
                ]
            }),
        [bottom, conversationId, loadMessages, name, navigation, profilePhoto]
    );

    const createConversation = useCallback(() => {
        postRequestUser<
            MessagesByUsernamesResponseInterface,
            CreateConversationPostInterface
        >('new-conversation', {
            receiver: username
        }).subscribe((response: MessagesByUsernamesResponseInterface) => {
            if (response?.status) {
                // Set conversation id after creating or getting conversation
                navigation.setParams({
                    conversationId: response?.conversationId
                } as undefined);

                setMessages(response?.data);

                if (response?.data?.length) {
                    updateLastRead(response.conversationId);
                }
            }
        });
    }, [navigation, username]);

    useFocusEffect(
        useCallback(() => {
            if (username) {
                return createConversation();
            }

            return () => {};
        }, [createConversation, username])
    );

    // loadMessages has conversationId dependency that would cause redundant load
    useFocusEffect(
        useCallback(() => {
            if (!username) {
                return loadMessages();
            }

            return () => {};
        }, [loadMessages, username])
    );

    const startLoadingInterval = useCallback(() => {
        clearInterval(interval.current);

        interval.current = setInterval(() => {
            loadMessages();
        }, 3000);
    }, [loadMessages]);

    useFocusEffect(startLoadingInterval);

    useEffect(() => {
        if (!isFocused) {
            clearInterval(interval.current);
        }
    }, [isFocused]);

    const addReaction = useCallback(
        (messageId: number, value: string) => {
            const index = messages.findIndex(
                (message: MessageProps) => message.id === messageId
            );

            if (!messages[index]?.reactions?.length) {
                messages[index].reactions = [value];
            } else if (!messages[index].reactions.includes(value)) {
                messages[index].reactions = [
                    ...messages[index].reactions,
                    value
                ];
            }

            setMessages(messages);
            setRefreshList(!refreshList);
        },
        [messages, refreshList]
    );

    const onReplyHuddle = (item: HuddleItemInterface) => {
        setIsReplying(true);
        setReplyMessage(item.message);
        setReplyPhoto(item?.photo);

        input.current.focus();
    };

    const onReplyMessage = (item: MessageProps) => {
        setIsReplying(true);
        setReplyMessage(item?.message);
        setReplyPhoto(item?.url);

        input.current.focus();
    };

    const openLikes = (id: number) => {
        setHuddleId(id);
        showModal();
    };

    const { renderMessageItem, keyMessageExtractor, onEndReached } =
        useRenderMesages(
            messages,
            conversationId,
            name,
            profilePhoto,
            loadMessages,
            addReaction,
            onReplyHuddle,
            onReplyMessage,
            openLikes
        );

    const sendMessage = useCallback(
        (message: string, buffer: string, fileName: string) => {
            loadMessagesEnabled.current = false;

            setMessages((value) => [
                {
                    id: value?.length ? value[0]?.id + 1 : 1,
                    sender: user,
                    message,
                    time: moment().unix(),
                    animate: true
                },
                ...(value?.length ? value : [])
            ]);

            postRequestUser<ResponseInterface, MessagePostInterface>(
                'message',
                {
                    conversationId,
                    message,
                    buffer,
                    fileName,
                    replyMessage,
                    replyPhoto
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    setIsReplying(false);
                    setReplyMessage(null);
                    setReplyPhoto(null);
                    loadMessagesEnabled.current = true;
                    loadMessages();
                }
            });
        },
        [conversationId, loadMessages, replyMessage, replyPhoto, user]
    );

    const onScroll = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (e.nativeEvent.contentOffset.y === 0) {
                startLoadingInterval();
            }
        },
        [startLoadingInterval]
    );

    const getKeyboardOffset = (): number => {
        if (isiOS()) {
            if (bottom) {
                return 62;
            }
            return 50;
        }
        return 85;
    };

    return (
        <View
            style={[
                ConversationScreenStyle.container,
                {
                    paddingBottom: bottom - 15
                }
            ]}
        >
            <KeyboardAvoidingView keyboardVerticalOffset={getKeyboardOffset()}>
                <View style={ConversationScreenStyle.content}>
                    <FlashList
                        data={messages}
                        extraData={refreshList}
                        renderItem={renderMessageItem}
                        keyExtractor={keyMessageExtractor}
                        estimatedItemSize={68}
                        inverted
                        onScroll={onScroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            ConversationScreenStyle.listContainer
                        }
                        onEndReached={onEndReached}
                    />
                    {isReplying && (
                        <View style={ConversationScreenStyle.replyView}>
                            {replyPhoto && (
                                <FastImage
                                    source={{ uri: replyPhoto }}
                                    style={ConversationScreenStyle.replyPhoto}
                                />
                            )}
                            <Text
                                style={ConversationScreenStyle.replyMessageText}
                            >
                                {replyMessage}
                            </Text>
                        </View>
                    )}
                    <ChatInput
                        reference={input}
                        conversationId={conversationId}
                        name={name}
                        onSend={sendMessage}
                    />
                </View>
            </KeyboardAvoidingView>
            <Modal
                isVisible={modalVisible}
                content={
                    <HuddleLikesModal id={huddleId} hideModal={hideModal} />
                }
                backdropOpacity={0.2}
                onClose={hideModal}
                style={ConversationScreenStyle.huddleLikesModal}
            />
        </View>
    );
};
