import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
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
import { SendMessageInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { ConversationHeader } from '@components/conversation/ConversationHeader/ConversationHeader';

export const ConversationScreen = ({
    route
}: ConversationScreenProps): JSX.Element => {
    const { conversationId, name, profilePhoto, username } = route.params;

    const { firstname, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const navigation = useDefaultNavigation();
    const { bottom } = useSafeAreaInsets();

    const [messages, setMessages] = useState<Array<MessageItemProps>>([]);

    useEffect(
        () =>
            navigation.setOptions({
                headerLeft: () => (
                    <ConversationHeader
                        name={name}
                        profilePhoto={profilePhoto}
                    />
                )
            }),
        [name, navigation, profilePhoto]
    );

    const loadMessages = useCallback(
        (lastId?: number) => {
            let endpoint = `conversation/${conversationId}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<MessagesResponseInterface>(endpoint).subscribe(
                (response: MessagesResponseInterface) => {
                    if (response?.status) {
                        if (!lastId) {
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
        [conversationId]
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
            }
        });
    }, [navigation, user, username]);

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

    const { renderMessageItem, keyMessageExtractor, onEndReached } =
        useRenderMesages(messages, loadMessages);

    const sendMessage = useCallback(
        (message: string, buffer: string, fileName: string) => {
            postRequestUser<ResponseInterface, SendMessageInterface>(
                'message',
                {
                    sender: user,
                    name: firstname,
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
        [conversationId, firstname, loadMessages, user]
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
                        data={messages}
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
                    <ChatInput onSend={sendMessage} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
