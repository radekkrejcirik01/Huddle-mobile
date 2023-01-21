import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    TextInput,
    View,
    VirtualizedList
} from 'react-native';
import { useSelector } from 'react-redux';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import {
    ChatDataProps,
    ChatListProps
} from '@components/chat/ChatList/ChatList.props';
import { ReducerProps } from '@store/index/index.props';
import { useChatListRenders } from '@hooks/useChatListRenders';
import { useKeyboard } from '@hooks/useKeyboard';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    MessagesResponseInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    MessagesGetInterface,
    SendMessageInterface,
    UpdateReadInterface
} from '@interfaces/post/Post.inteface';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const ChatList = ({ conversationId }: ChatListProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [data, setData] = useState<Array<ChatDataProps>>([]);
    const [messageValue, setMessageValue] = useState<string>();
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const { getItem, renderItem, getItemCount, keyExtractor } =
        useChatListRenders(data);
    const { isKeyboardVisible } = useKeyboard();

    const listRef = useRef(null);

    const updateMessageRead = useCallback(
        (messageId: number) => {
            postRequest<ResponseInterface, UpdateReadInterface>(
                'https://x3u5q0e94f.execute-api.eu-central-1.amazonaws.com/messages/update/read',
                {
                    username,
                    conversationId,
                    messageId
                }
            ).subscribe();
        },
        [conversationId, username]
    );

    const loadMessages = useCallback(() => {
        postRequest<MessagesResponseInterface, MessagesGetInterface>(
            'https://x3u5q0e94f.execute-api.eu-central-1.amazonaws.com/messages/get/messages',
            {
                conversationId
            }
        ).subscribe((response: MessagesResponseInterface) => {
            if (response?.status) {
                setData(response?.data);
                updateMessageRead(response?.data[0].id);
            }
        });
    }, [conversationId, updateMessageRead]);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    useEffect(() => {
        if (!isKeyboardVisible) {
            listRef.current?.scrollToOffset({ offset });
            setScrollEnabled(true);
        }
    }, [isKeyboardVisible, offset]);

    const onScrollBeginDrag = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (isKeyboardVisible) {
                setScrollEnabled(false);
                setOffset(event.nativeEvent.contentOffset.y);
                Keyboard.dismiss();
            }
        },
        [isKeyboardVisible]
    );

    const sendMessage = useCallback(() => {
        postRequest<ResponseInterface, SendMessageInterface>(
            'https://x3u5q0e94f.execute-api.eu-central-1.amazonaws.com/messages/send/message',
            {
                sender: username,
                conversationId,
                message: messageValue
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                loadMessages();
            }
        });
    }, [conversationId, loadMessages, messageValue, username]);

    const onSend = useCallback(() => {
        Keyboard.dismiss();
        sendMessage();

        setMessageValue(null);
    }, [sendMessage]);

    return (
        <>
            <VirtualizedList
                ref={listRef}
                data={data}
                getItem={getItem}
                renderItem={renderItem}
                getItemCount={getItemCount}
                keyExtractor={keyExtractor}
                initialNumToRender={40}
                showsVerticalScrollIndicator={false}
                inverted
                scrollEnabled={scrollEnabled}
                keyboardShouldPersistTaps="always"
                onScrollBeginDrag={onScrollBeginDrag}
                contentContainerStyle={ChatListStyle.contentContainer}
            />
            <View style={ChatListStyle.container}>
                <TextInput
                    placeholder="Message..."
                    placeholderTextColor={COLORS.WHITE}
                    onChangeText={setMessageValue}
                    value={messageValue}
                    multiline
                    selectionColor={COLORS.WHITE}
                    style={ChatListStyle.input}
                />
                <View style={ChatListStyle.sendView}>
                    <TouchableOpacity disabled={!messageValue} onPress={onSend}>
                        <Text style={ChatListStyle.send}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
