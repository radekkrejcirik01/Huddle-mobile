import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import {
    useIsFocused,
    useNavigation as useDefaultNavigation
} from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRenderMesages } from '@hooks/useRenderMesages';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import {
    ConversationScreenProps,
    MessageItemProps
} from '@screens/account/ConversationScreen/ConversationScreen.props';
import { ConversationScreenStyle } from '@screens/account/ConversationScreen/ConversationScreen.style';
import { getRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import {
    MessagesByUsernamesResponseInterface,
    MessagesResponseInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ChatInput } from '@components/conversation/ChatInput/ChatInput';
import {
    LastReadMessagePostInterface,
    SendMessageInterface
} from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { ConversationHeader } from '@components/conversation/ConversationHeader/ConversationHeader';
import { ConversationLike } from '@components/conversation/ConversationLike/ConversationLike';

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

    const updateLastReadMessage = useCallback(
        (idConversation: number, idMessage: number) => {
            if (idConversation && idMessage) {
                postRequestUser<
                    ResponseInterface,
                    LastReadMessagePostInterface
                >('last-read-message', {
                    username: user,
                    conversationId: idConversation,
                    messageId: idMessage
                }).subscribe();
            }
        },
        [user]
    );

    const loadMessages = useCallback(
        (lastId?: number) => {
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
        },
        [conversationId, updateLastReadMessage]
    );

    const loadMessagesByUsernames = useCallback(() => {
        getRequestUser<MessagesByUsernamesResponseInterface>(
            `messages/${user}/${username}`
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
    }, [navigation, updateLastReadMessage, user, username]);

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
            } else {
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
            postRequestUser<ResponseInterface, SendMessageInterface>(
                'message',
                {
                    sender: user,
                    conversationId,
                    message,
                    buffer,
                    fileName
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadMessages();
                }
            });
        },
        [conversationId, loadMessages, user]
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
            <KeyboardAvoidingView keyboardVerticalOffset={42}>
                <View style={ConversationScreenStyle.content}>
                    <FlashList
                        onScroll={(e) => {
                            if (e.nativeEvent.contentOffset.y === 0) {
                                startLoadingInterval();
                            }
                        }}
                        data={messages}
                        extraData={refreshList}
                        renderItem={renderMessageItem}
                        keyExtractor={keyMessageExtractor}
                        estimatedItemSize={68}
                        inverted
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            ConversationScreenStyle.listContainer
                        }
                        ItemSeparatorComponent={() => (
                            <ItemSeparator space={2} />
                        )}
                        onEndReached={onEndReached}
                    />
                    <ChatInput name={name} onSend={sendMessage} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
