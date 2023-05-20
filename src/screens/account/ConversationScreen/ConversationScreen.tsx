import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useRenderMesages } from '@hooks/useRenderMesages';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import {
    ConversationScreenProps,
    MessageItemProps
} from '@screens/account/ConversationScreen/ConversationScreen.props';
import { ConversationScreenStyle } from '@screens/account/ConversationScreen/ConversationScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { getRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import {
    MessagesByUsernamesResponseInterface,
    MessagesResponseInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ChatInput } from '@components/conversation/ChatInput/ChatInput';
import { SendMessageInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';

export const ConversationScreen = ({
    route
}: ConversationScreenProps): JSX.Element => {
    const { conversationId, name, profilePhoto, username } = route.params;

    const { firstname, username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const openProfilePhoto = useOpenProfilePhoto();
    const navigation = useNavigation();
    const { bottom, top } = useSafeAreaInsets();

    const [messages, setMessages] = useState<Array<MessageItemProps>>([]);

    useEffect(
        () =>
            navigation.setOptions({
                headerStyle: {
                    height: top + 100,
                    ...ConversationScreenStyle.header
                },
                title: (
                    <View style={ConversationScreenStyle.titleView}>
                        <TouchableOpacity
                            onPress={() => openProfilePhoto(name, profilePhoto)}
                            style={ConversationScreenStyle.titleView}
                        >
                            <FastImage
                                source={{ uri: profilePhoto }}
                                style={ConversationScreenStyle.image}
                            />
                            <Text style={ConversationScreenStyle.name}>
                                {name}
                            </Text>
                        </TouchableOpacity>
                        <Text style={ConversationScreenStyle.status}>
                            In this chat 12 minutes ago
                        </Text>
                    </View>
                )
            }),
        [name, navigation, openProfilePhoto, profilePhoto, top]
    );

    const loadMessages = useCallback(
        (lastId?: number) => {
            let endpoint = `conversation/${conversationId}`;
            if (lastId) {
                endpoint += `/${lastId}`;
            }

            getRequestUser<MessagesResponseInterface>(endpoint).subscribe(
                (response: MessagesResponseInterface) => {
                    if (response?.status && !!response?.data?.length) {
                        if (lastId) {
                            setMessages((value) =>
                                value.concat(response?.data)
                            );
                        } else {
                            setMessages(response?.data);
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
            <KeyboardAvoidingView keyboardVerticalOffset={98}>
                <View style={ConversationScreenStyle.content}>
                    <FlashList
                        data={messages}
                        renderItem={renderMessageItem}
                        keyExtractor={keyMessageExtractor}
                        estimatedItemSize={68}
                        inverted
                        showsVerticalScrollIndicator={false}
                        onEndReached={onEndReached}
                    />
                    <ChatInput onSend={sendMessage} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
