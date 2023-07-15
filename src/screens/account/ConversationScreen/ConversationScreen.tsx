import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
    useIsFocused,
    useNavigation as useDefaultNavigation
} from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { useRenderMesages } from '@hooks/useRenderMesages';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import {
    ConversationScreenProps,
    MessageItemProps
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
    LastReadMessagePostInterface,
    MessagePostInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { ConversationHeader } from '@components/conversation/ConversationHeader/ConversationHeader';
import { ConversationLike } from '@components/conversation/ConversationLike/ConversationLike';
import { isiOS } from '@functions/checking-functions';

export const ConversationScreen = ({
    route
}: ConversationScreenProps): JSX.Element => {
    const { conversationId, name, profilePhoto, username } = route.params;

    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const navigation = useDefaultNavigation();
    const isFocused = useIsFocused();
    const { bottom } = useSafeAreaInsets();

    const [messages, setMessages] = useState<Array<MessageItemProps>>([]);
    const [refreshList, setRefreshList] = useState<boolean>(false);

    const interval = useRef(null);
    const loadMessagesEnabled = useRef<boolean>(true);

    useEffect(
        () =>
            navigation.setOptions({
                title: (
                    <ConversationHeader
                        conversationId={conversationId}
                        name={name}
                        profilePhoto={profilePhoto}
                    />
                ),
                ...(conversationId && {
                    headerRight: () => (
                        <ConversationLike conversationId={conversationId} />
                    )
                })
            }),
        [conversationId, name, navigation, profilePhoto]
    );

    const updateLastReadMessage = (
        idConversation: number,
        idMessage: number
    ) => {
        if (idConversation && idMessage) {
            putRequestUser<ResponseInterface, LastReadMessagePostInterface>(
                'last-read-message',
                {
                    conversationId: idConversation,
                    messageId: idMessage
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
                                    updateLastReadMessage(
                                        conversationId,
                                        response.data[0].id
                                    );
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

    const loadMessagesByUsernames = useCallback(() => {
        getRequestUser<MessagesByUsernamesResponseInterface>(
            `messages/${username}`
        ).subscribe((response: MessagesByUsernamesResponseInterface) => {
            if (response?.status) {
                // Set conversation id after creating or getting conversation
                navigation.setParams({
                    conversationId: response?.conversationId
                } as undefined);

                setMessages(response?.data);

                if (response?.data?.length) {
                    updateLastReadMessage(
                        response.conversationId,
                        response.data[0].id
                    );
                }
            }
        });
    }, [navigation, username]);

    useEffect(() => {
        if (username) {
            return loadMessagesByUsernames();
        }

        return () => {};
    }, [loadMessagesByUsernames, username]);

    // loadMessages has conversationId dependency that would cause redundant load
    useEffect(() => {
        if (!username) {
            return loadMessages();
        }

        return () => {};
    }, [loadMessages, username]);

    const startLoadingInterval = useCallback(() => {
        clearInterval(interval.current);

        interval.current = setInterval(() => {
            loadMessages();
        }, 3000);
    }, [loadMessages]);

    useEffect(() => startLoadingInterval(), [startLoadingInterval]);

    useEffect(() => {
        if (!isFocused) {
            clearInterval(interval.current);
        }
    }, [isFocused]);

    const addReaction = useCallback(
        (messageId: number, value: string) => {
            const index = messages.findIndex(
                (message: MessageItemProps) => message.id === messageId
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

    const { renderMessageItem, keyMessageExtractor, onEndReached } =
        useRenderMesages(messages, conversationId, loadMessages, addReaction);

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
                    fileName
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadMessagesEnabled.current = true;
                    loadMessages();
                }
            });
        },
        [conversationId, loadMessages, user]
    );

    const onScroll = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (e.nativeEvent.contentOffset.y === 0) {
                startLoadingInterval();
            }
        },
        [startLoadingInterval]
    );

    return (
        <View
            style={[
                ConversationScreenStyle.container,
                {
                    paddingBottom: bottom - 15
                }
            ]}
        >
            <KeyboardAvoidingView keyboardVerticalOffset={isiOS() ? 42 : 75}>
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
                    <ChatInput name={name} onSend={sendMessage} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
