import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, View, VirtualizedList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
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

    const sendMessage = useCallback(() => {
        postRequest<ResponseInterface, SendMessageInterface>(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/send/message',
            {
                sender: username,
                name: firstname,
                picture,
                conversationId,
                message: messageValue
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                loadMessages();
            }
        });
    }, [
        conversationId,
        firstname,
        loadMessages,
        messageValue,
        picture,
        username
    ]);

    const openPhoto = useCallback(() => {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false,
            cropperChooseText: 'Send'
        }).then((image) => {
            console.log(image.path);
        });
    }, []);

    const openGallery = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false,
            cropperChooseText: 'Send'
        }).then((image) => {
            console.log(image.path);
        });
    }, []);

    const onSend = useCallback(() => {
        sendMessage();
        setMessageValue(null);
    }, [sendMessage]);

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
                <IconButton
                    icon={IconEnum.PHOTO}
                    onPress={openPhoto}
                    size={25}
                    style={ChatListStyle.iconButton}
                />
                <IconButton
                    icon={IconEnum.GALLERY}
                    onPress={openGallery}
                    size={20}
                    style={ChatListStyle.iconButton}
                />
                <View style={ChatListStyle.inputContainer}>
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
