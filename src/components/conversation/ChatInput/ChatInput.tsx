import React, { useCallback, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import COLORS from '@constants/COLORS';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ChatInputProps } from '@components/conversation/ChatInput/ChatInput.props';
import { ChatInputStyle } from '@components/conversation/ChatInput/ChatInput.style';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { TypingPostInterface } from '@interfaces/post/Post.inteface';

export const ChatInput = ({
    reference,
    conversationId,
    onSend,
    name
}: ChatInputProps): JSX.Element => {
    const [message, setMessage] = useState<string>();

    const isTyping = useRef<boolean>(false);
    const timer = useRef(null);

    const send = useCallback(() => {
        onSend(message);

        setMessage(null);
    }, [message, onSend]);

    const openGallery = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false,
            cropperChooseText: 'Send'
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            onSend('', base64, image?.filename);
        });
    }, [onSend]);

    const sendTyping = useCallback(
        (typing: boolean) => {
            postRequestUser<ResponseInterface, TypingPostInterface>('typing', {
                conversationId,
                isTyping: typing ? 1 : 0
            }).subscribe();
        },
        [conversationId]
    );

    const onChange = useCallback(() => {
        if (!isTyping.current) {
            isTyping.current = true;
            sendTyping(true);
        } else {
            clearTimeout(timer.current);
        }

        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            sendTyping(false);
            isTyping.current = false;
        }, 2000);
    }, [sendTyping]);

    return (
        <View style={ChatInputStyle.container}>
            <View style={ChatInputStyle.inputContainer}>
                <TextInput
                    ref={reference}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    placeholder={`Message ${name}...`}
                    onChange={onChange}
                    placeholderTextColor={COLORS.LIGHTGRAY_100}
                    selectionColor={COLORS.WHITE}
                    style={ChatInputStyle.input}
                />
                <View
                    style={[
                        ChatInputStyle.sendView,
                        !message && ChatInputStyle.sendOpacity
                    ]}
                >
                    <TouchableOpacity disabled={!message} onPress={send}>
                        <Text style={ChatInputStyle.sendText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <IconButton
                icon={IconEnum.GALLERY}
                onPress={openGallery}
                size={20}
                style={ChatInputStyle.galleryIcon}
            />
        </View>
    );
};
