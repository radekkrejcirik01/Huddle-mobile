import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import { ChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseConversationCreateInterface } from '@interfaces/response/Response.interface';
import { ConversationsCreateInterface } from '@interfaces/post/Post.inteface';

export const ChatScreen = ({ route }: ChatScreenProps): JSX.Element => {
    const { conversationId = 0, usernames, title } = route.params;

    const navigation = useNavigation();

    const [id, setId] = useState<number>(conversationId);

    useEffect(() => {
        const unsubscribe = navigation.setOptions({ title });
        return unsubscribe;
    }, [navigation, title]);

    const createConversation = useCallback(() => {
        if (!conversationId) {
            postRequest<
                ResponseConversationCreateInterface,
                ConversationsCreateInterface
            >(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/create/conversation',
                {
                    usernames
                }
            ).subscribe((response: ResponseConversationCreateInterface) => {
                if (response?.status) {
                    setId(response?.conversationId);
                }
            });
        }
    }, [conversationId, usernames]);

    useEffect(() => {
        createConversation();
        return createConversation();
    }, [createConversation]);

    return (
        <SafeAreaView>
            <KeyboardAvoidingView keyboardVerticalOffset={55}>
                <View style={ChatScreenStyle.container}>
                    {!!id && <ChatList conversationId={id} />}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
