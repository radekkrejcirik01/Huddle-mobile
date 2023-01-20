import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import { ChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';

export const ChatScreen = ({ route }: ChatScreenProps): JSX.Element => {
    const { title, conversationId } = route.params;

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title });
    }, [navigation, title]);

    return (
        <SafeAreaView>
            <KeyboardAvoidingView keyboardVerticalOffset={50}>
                <View style={ChatScreenStyle.container}>
                    <ChatList conversationId={conversationId} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
