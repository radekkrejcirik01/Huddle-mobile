import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import { ChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseConversationCreateInterface } from '@interfaces/response/Response.interface';
import { ConversationsCreateInterface } from '@interfaces/post/Post.inteface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const ChatScreen = ({ route }: ChatScreenProps): JSX.Element => {
    const { conversationId = 0, image, usernames, title } = route.params;

    const navigation = useNavigation();

    const [id, setId] = useState<number>(conversationId);

    const onPhotoPress = useCallback(() => {
        navigation.navigate(
            AccountStackNavigatorEnum.PictureScreen as never,
            {
                title,
                picture: image
            } as never
        );
    }, [image, navigation, title]);

    useEffect(
        () =>
            navigation.setOptions({
                title,
                headerRight: () => (
                    <TouchableOpacity onPress={onPhotoPress}>
                        <FastImage
                            source={{ uri: image }}
                            style={ChatScreenStyle.image}
                        />
                    </TouchableOpacity>
                )
            }),
        [image, navigation, onPhotoPress, title]
    );

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
                    {!!id && <ChatList conversationId={id} picture={image} />}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
