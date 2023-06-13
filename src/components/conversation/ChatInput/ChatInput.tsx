import React, { useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import COLORS from '@constants/COLORS';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ChatInputProps } from '@components/conversation/ChatInput/ChatInput.props';
import { ChatInputStyle } from '@components/conversation/ChatInput/ChatInput.style';

export const ChatInput = ({ onSend, name }: ChatInputProps): JSX.Element => {
    const [message, setMessage] = useState<string>();

    const send = useCallback(() => {
        onSend(message);

        setMessage(null);
    }, [message, onSend]);

    const openGallery = useCallback(() => {
        ImagePicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.7,
            waitAnimationEnd: false,
            cropperChooseText: 'Send'
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            onSend('', base64, image?.filename);
        });
    }, [onSend]);

    return (
        <View style={ChatInputStyle.container}>
            <View style={ChatInputStyle.inputContainer}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    placeholder={`Message ${name}`}
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
