import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import { ChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ConversationDetailsInterface,
    ResponseConversationCreateInterface,
    ResponseGetConversationDetailsInterface
} from '@interfaces/response/Response.interface';
import {
    ConversationsCreateInterface,
    GetConversationsDetailsInterface
} from '@interfaces/post/Post.inteface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { TypingIndicatorEnum } from '@components/general/TypingIndicator/TypingIndicator.enum';
import { TypingIndicator } from '@components/general/TypingIndicator/TypingIndicator';
import { useTypingIndicator } from '@hooks/useTypingIndicator';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const ChatScreen = ({ route }: ChatScreenProps): JSX.Element => {
    const {
        createNewConversation = false,
        conversationId = 0,
        usernames
    } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openPhoto = useOpenPhoto();
    const navigation = useDefaultNavigation();
    const { isTyping } = useTypingIndicator(conversationId);

    const [id, setId] = useState<number>(conversationId);
    const [isGroup, setIsGroup] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const [image, setImage] = useState<string>();
    const [conversationUsers, setConversationUsers] = useState<
        ConversationDetailsInterface['users']
    >([]);

    const getConversationDetails = useCallback(() => {
        if (conversationId && id) {
            postRequest<
                ResponseGetConversationDetailsInterface,
                GetConversationsDetailsInterface
            >(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/get/conversation/details',
                {
                    conversationId: id,
                    username
                }
            ).subscribe((response: ResponseGetConversationDetailsInterface) => {
                if (response?.status) {
                    setIsGroup(response?.data?.users?.length > 2);
                    setTitle(response?.data?.name);
                    setImage(response?.data?.picture);
                    setConversationUsers(response?.data?.users);
                }
            });
        }
    }, [conversationId, id, username]);

    const { navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        getConversationDetails
    );

    const createConversation = useCallback(() => {
        if (createNewConversation) {
            Alert.alert('B');
            postRequest<
                ResponseConversationCreateInterface,
                ConversationsCreateInterface
            >(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/create/conversation',
                {
                    usernames,
                    username
                }
            ).subscribe((response: ResponseConversationCreateInterface) => {
                if (response?.status) {
                    setId(response?.data?.id);
                    setIsGroup(response?.data?.users?.length > 2);
                    setTitle(response?.data?.name);
                    setImage(response?.data?.picture);
                    setConversationUsers(response?.data?.users);
                }
            });
        }
    }, [createNewConversation, username, usernames]);

    useEffect(() => createConversation(), [createConversation]);

    const onPhotoPress = useCallback(
        () => openPhoto(image),
        [image, openPhoto]
    );

    const openConversationDetail = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ChatDetailScreen, {
            conversationId: id
        });
    }, [id, navigateTo]);

    const animation = useMemo(
        (): string => (!isTyping ? 'fadeIn' : 'fadeOut'),
        [isTyping]
    );

    const TitleComponent = useCallback((): JSX.Element => {
        if (isGroup && !title) {
            return (
                <TouchableOpacity
                    onPress={openConversationDetail}
                    style={ChatScreenStyle.headerUsersView}
                >
                    {conversationUsers.map((value) => (
                        <View
                            key={value.username}
                            style={ChatScreenStyle.headerUsersItemView}
                        >
                            <FastImage
                                source={{ uri: value?.profilePicture }}
                                style={ChatScreenStyle.headerUsersItemImage}
                            />
                            <Text style={ChatScreenStyle.headerUsersItemText}>
                                {value.firstname}
                            </Text>
                        </View>
                    ))}
                </TouchableOpacity>
            );
        }
        return (
            <Animatable.Text animation={animation} duration={300}>
                <TouchableOpacity onPress={openConversationDetail}>
                    <Text style={ChatScreenStyle.headerTitle}>{title}</Text>
                </TouchableOpacity>
            </Animatable.Text>
        );
    }, [animation, conversationUsers, isGroup, openConversationDetail, title]);

    useEffect(
        () =>
            navigation.setOptions({
                headerRight: () => (
                    <View style={ChatScreenStyle.headerRightView}>
                        <View style={ChatScreenStyle.headerRightRow}>
                            {isTyping ? (
                                <TypingIndicator
                                    conversationId={id}
                                    type={TypingIndicatorEnum.Chat}
                                />
                            ) : (
                                <TitleComponent />
                            )}
                        </View>
                        <TouchableOpacity
                            disabled={!image}
                            onPress={onPhotoPress}
                        >
                            <FastImage
                                source={{ uri: image }}
                                style={ChatScreenStyle.image}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }),
        [TitleComponent, id, image, isTyping, navigation, onPhotoPress]
    );

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
