import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Text, TextInput, View, VirtualizedList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import {
    ChatDataProps,
    ChatListProps
} from '@components/chat/ChatList/ChatList.props';
import { ReducerProps } from '@store/index/index.props';
import { useChatListRenders } from '@hooks/useChatListRenders';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    MessagesResponseInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    MessagesGetInterface,
    SendMessageInterface,
    SendTypingInterface,
    UpdateReadInterface
} from '@interfaces/post/Post.inteface';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import {
    setConversationId,
    setLoadConversation,
    setLoadRead
} from '@store/Conversation';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';

export const ChatList = ({
    conversationId,
    picture
}: ChatListProps): JSX.Element => {
    const { firstname, username } = useSelector(
        (state: ReducerProps) => state.user.user
    );
    const { loadConversation, loadRead } = useSelector(
        (state: ReducerProps) => state.conversation
    );
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [data, setData] = useState<Array<ChatDataProps>>([]);
    const [messageValue, setMessageValue] = useState<string>();

    const intervalRef = useRef(null);
    const messageRef = useRef(null);
    const [typingState, setTypingState] = useState<'typing' | 'finished'>();

    const { getItem, renderItem, getItemCount, keyExtractor } =
        useChatListRenders(data);

    const updateMessageRead = useCallback(
        (messageId: number) => {
            postRequest<ResponseInterface, UpdateReadInterface>(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/update/read',
                {
                    username,
                    conversationId,
                    messageId
                }
            ).subscribe();
        },
        [conversationId, username]
    );

    const loadMessages = useCallback(
        (updateRead = true) => {
            postRequest<MessagesResponseInterface, MessagesGetInterface>(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/get/messages',
                {
                    conversationId
                }
            ).subscribe((response: MessagesResponseInterface) => {
                if (response?.status) {
                    setData(response?.data);
                    if (updateRead && response?.data?.length) {
                        updateMessageRead(response?.data[0]?.id);
                    }
                }
            });
        },
        [conversationId, updateMessageRead]
    );

    useEffect(() => loadMessages(), [loadMessages]);

    useEffect(() => {
        dispatch(setConversationId(conversationId));
    }, [conversationId, dispatch]);

    useEffect(() => {
        navigation.addListener('beforeRemove', () => {
            dispatch(setConversationId(null));
        });
    }, [dispatch, navigation]);

    useEffect(() => {
        if (loadConversation) {
            loadMessages();
        }
        dispatch(setLoadConversation(false));
    }, [dispatch, loadConversation, loadMessages]);

    useEffect(() => {
        if (loadRead) {
            loadMessages(false);
        }
        dispatch(setLoadRead(false));
    }, [dispatch, loadMessages, loadRead]);

    const sendMessage = useCallback(
        (buffer?: string, fileName?: string) => {
            postRequest<ResponseInterface, SendMessageInterface>(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/send/message',
                {
                    sender: username,
                    name: firstname,
                    conversationId,
                    message: messageValue,
                    buffer,
                    fileName
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadMessages();
                }
            });
        },
        [conversationId, firstname, loadMessages, messageValue, username]
    );

    const openPhoto = useCallback(() => {
        ImagePicker.openCamera({
            cropping: true,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.5,
            waitAnimationEnd: false,
            cropperChooseText: 'Send'
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            sendMessage(base64, image?.filename);
        });
    }, [sendMessage]);

    const openGallery = useCallback(() => {
        ImagePicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.7,
            waitAnimationEnd: false,
            cropperChooseText: 'Send'
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            sendMessage(base64, image?.filename);
        });
    }, [sendMessage]);

    const onSend = useCallback(() => {
        sendMessage();
        setMessageValue(null);
    }, [sendMessage]);

    const sendStartedTyping = useCallback(() => {
        postRequest<ResponseInterface, SendTypingInterface>(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/send/typing',
            {
                conversationId,
                username: firstname,
                value: 1
            }
        ).subscribe();
    }, [conversationId, firstname]);

    const sendFinishedTyping = useCallback(() => {
        postRequest<ResponseInterface, SendTypingInterface>(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/send/typing',
            {
                conversationId,
                username: firstname,
                value: 0
            }
        ).subscribe();
    }, [conversationId, firstname]);

    useEffect(() => {
        if (typingState === 'typing') {
            sendStartedTyping();
        }
        if (typingState === 'finished') {
            sendFinishedTyping();
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [sendFinishedTyping, sendStartedTyping, typingState]);

    const checkTyping = useCallback(() => {
        if (messageRef.current !== messageValue) {
            setTypingState('typing');
        } else {
            setTypingState('finished');
        }
        messageRef.current = messageValue;
    }, [messageValue]);

    const onChangeText = useCallback(
        (value: string) => {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    checkTyping();
                }, 1000);
            }
            messageRef.current = value;
            setMessageValue(value);
        },
        [checkTyping]
    );

    return (
        <>
            <VirtualizedList
                data={data}
                getItem={getItem}
                renderItem={renderItem}
                getItemCount={getItemCount}
                keyExtractor={keyExtractor}
                initialNumToRender={20}
                showsVerticalScrollIndicator={false}
                inverted
                keyboardShouldPersistTaps="always"
                onScrollBeginDrag={Keyboard.dismiss}
                contentContainerStyle={ChatListStyle.contentContainer}
            />
            <View style={ChatListStyle.bottomContainer}>
                <View style={ChatListStyle.inputContainer}>
                    <View style={[ChatListStyle.iconsButtonsView]}>
                        <IconButton
                            icon={IconEnum.PHOTO}
                            onPress={openPhoto}
                            size={24}
                            style={[
                                ChatListStyle.photoIcon,
                                ChatListStyle.iconButton
                            ]}
                        />
                        <IconButton
                            icon={IconEnum.GALLERY}
                            onPress={openGallery}
                            size={20}
                            style={ChatListStyle.iconButton}
                        />
                    </View>
                    <TextInput
                        placeholder="Message..."
                        placeholderTextColor={COLORS.WHITE}
                        onChangeText={onChangeText}
                        value={messageValue}
                        multiline
                        selectionColor={COLORS.WHITE}
                        style={ChatListStyle.input}
                    />
                    <View style={ChatListStyle.sendView}>
                        <TouchableOpacity
                            disabled={!messageValue}
                            onPress={onSend}
                        >
                            <Text style={ChatListStyle.send}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};
