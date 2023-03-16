import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    Alert,
    ImageRequireSource,
    ScrollView,
    Text,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage, { Source } from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import { ChatDetailScreenStyle } from '@screens/account/ChatDetailScreen/ChatDetailScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useOpenPhoto } from '@hooks/useOpenPhoto';
import { ChatDetailScreenProps } from '@screens/account/ChatDetailScreen/ChatDetailScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { postRequest } from '@utils/Axios/Axios.service';
import {
    ConversationDetailsInterface,
    ResponseGetConversationDetailsInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import {
    ConversationDeleteInterface,
    ConversationUpdateInterface,
    ConversationUserRemoveInterface,
    GetConversationsDetailsInterface
} from '@interfaces/post/Post.inteface';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { ListItem } from '@components/general/ListItem/ListItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { IconEnum } from '@components/icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';

export const ChatDetailScreen = ({
    route
}: ChatDetailScreenProps): JSX.Element => {
    const { conversationId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const openPhoto = useOpenPhoto();
    const navigation = useDefaultNavigation();
    const { showActionSheetWithOptions } = useActionSheet();

    const [isSave, setIsSave] = useState<boolean>(false);

    const [conversationDetails, setConversationDetails] =
        useState<ConversationDetailsInterface>();

    const [isGroup, setIsGroup] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [conversationUsers, setConversationUsers] = useState<
        ConversationDetailsInterface['users']
    >([]);
    const [createdBy, setCreatedBy] = useState<string>();

    const photoRef = useRef<{ buffer: string; fileName: string }>({
        buffer: null,
        fileName: null
    });

    const loadConversationDetails = useCallback(() => {
        postRequest<
            ResponseGetConversationDetailsInterface,
            GetConversationsDetailsInterface
        >(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/get/conversation/details',
            {
                conversationId,
                username
            }
        ).subscribe((response: ResponseGetConversationDetailsInterface) => {
            if (response?.status) {
                setIsGroup(response?.data?.type === 'group');
                setTitle(response?.data?.name);
                setPhoto(response?.data?.picture);
                setConversationUsers(response?.data?.users);
                setCreatedBy(response?.data.createdBy);
                setConversationDetails(response?.data);
            }
        });
    }, [conversationId, username]);

    const { navigateBack, navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack,
        loadConversationDetails
    );

    const save = useCallback(() => {
        postRequest<ResponseInterface, ConversationUpdateInterface>(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/update/conversation',
            {
                id: conversationId,
                buffer:
                    conversationDetails?.picture === photo
                        ? null
                        : photoRef?.current?.buffer,
                fileName:
                    conversationDetails?.picture === photo
                        ? null
                        : photoRef?.current?.fileName,
                name: conversationDetails?.name === title ? null : title
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setIsSave(false);
            }
        });
    }, [
        conversationDetails?.name,
        conversationDetails?.picture,
        conversationId,
        photo,
        title
    ]);

    useEffect(() => {
        if (
            conversationDetails?.picture === photo &&
            conversationDetails?.name === title
        ) {
            setIsSave(false);
        } else if (conversationDetails) {
            setIsSave(true);
        }
    }, [conversationDetails, isGroup, photo, title]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                isSave && (
                    <TouchableOpacity onPress={save}>
                        <Text style={ChatDetailScreenStyle.save}>Save</Text>
                    </TouchableOpacity>
                )
        });
    }, [isSave, navigation, save]);

    const changePhotoPress = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            photoRef.current.buffer = await fs.readFile(image?.path, 'base64');
            photoRef.current.fileName = image.filename;

            setPhoto(image.path);
        });
    };

    const onPhotoPress = useCallback(
        () => openPhoto(photo),
        [openPhoto, photo]
    );

    const source = useMemo(
        (): Source | ImageRequireSource => ({ uri: photo }),
        [photo]
    );

    const removeUserFromChat = useCallback(
        (removeUsername: string) => {
            postRequest<ResponseInterface, ConversationUserRemoveInterface>(
                'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/remove/conversation/user',
                {
                    conversationId,
                    username: removeUsername
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadConversationDetails();
                }
            });
        },
        [conversationId, loadConversationDetails]
    );

    const leaveChat = useCallback(() => {
        postRequest<ResponseInterface, ConversationUserRemoveInterface>(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/remove/conversation/user',
            {
                conversationId,
                username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                navigateTo(AccountStackNavigatorEnum.ChatScreen);
                navigateBack();
            }
        });
    }, [conversationId, navigateBack, navigateTo, username]);

    const onLeaveChatPress = useCallback(() => {
        Alert.alert('Are you sure?', '', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Yes',
                onPress: leaveChat,
                style: 'destructive'
            }
        ]);
    }, [leaveChat]);

    const onPressUser = useCallback(
        (usernameValue: string, firstname: string) => {
            const options = [
                usernameValue === username
                    ? 'Leave chat'
                    : `Remove ${firstname} from chat`,
                'Cancel'
            ];

            showActionSheetWithOptions(
                {
                    cancelButtonIndex: 1,
                    options,
                    userInterfaceStyle: 'dark',
                    title: usernameValue
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        if (usernameValue === username) {
                            onLeaveChatPress();
                        } else {
                            removeUserFromChat(usernameValue);
                        }
                    }
                }
            );
        },
        [
            onLeaveChatPress,
            removeUserFromChat,
            showActionSheetWithOptions,
            username
        ]
    );

    const addUserPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.AddConversationPeopleScreen, {
            conversationId
        });
    }, [conversationId, navigateTo]);

    const deleteChat = useCallback(() => {
        postRequest<ResponseInterface, ConversationDeleteInterface>(
            'https://4thoa9jdo6.execute-api.eu-central-1.amazonaws.com/messages/delete/conversation',
            {
                conversationId
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                navigateTo(AccountStackNavigatorEnum.ChatScreen);
                navigateBack();
            }
        });
    }, [conversationId, navigateBack, navigateTo]);

    const onDeleteChatPress = useCallback(() => {
        Alert.alert(
            'Are you sure?',
            'All messages and photos will be deleted',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: deleteChat,
                    style: 'destructive'
                }
            ]
        );
    }, [deleteChat]);

    return (
        <ScrollView
            contentContainerStyle={ChatDetailScreenStyle.contentContainer}
        >
            <View>
                <TouchableOpacity
                    disabled={isGroup ? false : !photo}
                    onPress={isGroup ? changePhotoPress : onPhotoPress}
                    style={ChatDetailScreenStyle.imageTouchableOpacity}
                >
                    <FastImage
                        source={source}
                        style={ChatDetailScreenStyle.image}
                    />
                </TouchableOpacity>
                {isGroup ? (
                    <>
                        <Text style={ChatDetailScreenStyle.inputTitle}>
                            Title 🖋
                        </Text>
                        <Input
                            value={title}
                            inputType={InputTypeEnum.TEXT}
                            onChange={setTitle}
                            viewStyle={ChatDetailScreenStyle.inputView}
                        />
                        <Text style={ChatDetailScreenStyle.inputTitle}>
                            People 👨‍👩‍👧‍👦
                        </Text>
                        <View style={ChatDetailScreenStyle.row}>
                            {conversationUsers?.map((value) => (
                                <TouchableOpacity
                                    key={value.username}
                                    onPress={() =>
                                        onPressUser(
                                            value.username,
                                            value.firstname
                                        )
                                    }
                                    onLongPress={() =>
                                        onPressUser(
                                            value.username,
                                            value.firstname
                                        )
                                    }
                                    style={
                                        ChatDetailScreenStyle.peopleTouchableOpacity
                                    }
                                >
                                    <FastImage
                                        style={
                                            ChatDetailScreenStyle.peopleImage
                                        }
                                        source={{
                                            uri: value?.profilePicture
                                        }}
                                    />
                                    <Text
                                        style={ChatDetailScreenStyle.peopleText}
                                    >
                                        {value?.firstname}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <IconButton
                                icon={IconEnum.PLUS}
                                onPress={addUserPress}
                                size={18}
                                style={ChatDetailScreenStyle.plusButton}
                            />
                        </View>
                    </>
                ) : (
                    <Text style={ChatDetailScreenStyle.title}>{title}</Text>
                )}
            </View>
            <View>
                {createdBy === username ? (
                    <ListItem
                        title="Delete chat"
                        onPress={onDeleteChatPress}
                        textStyle={ChatDetailScreenStyle.listItemText}
                    />
                ) : (
                    <ListItem
                        title="Leave chat"
                        onPress={onLeaveChatPress}
                        textStyle={ChatDetailScreenStyle.listItemText}
                    />
                )}
                <Text style={ChatDetailScreenStyle.createdByText}>
                    Crated by {createdBy === username ? 'you' : createdBy}
                </Text>
            </View>
        </ScrollView>
    );
};
