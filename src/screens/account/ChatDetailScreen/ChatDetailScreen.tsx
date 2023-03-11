import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { ImageRequireSource, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
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
    ConversationUpdateInterface,
    GetConversationsDetailsInterface
} from '@interfaces/post/Post.inteface';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { ListItem } from '@components/general/ListItem/ListItem';

export const ChatDetailScreen = ({
    route
}: ChatDetailScreenProps): JSX.Element => {
    const { conversationId } = route.params;

    const { username } = useSelector((state: ReducerProps) => state.user.user);
    const createdBy = username;

    const openPhoto = useOpenPhoto();
    const navigation = useNavigation();
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

    const photoRef = useRef<{ buffer: string; fileName: string }>({
        buffer: null,
        fileName: null
    });

    useEffect(() => {
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
                setIsGroup(response?.data?.users?.length > 2);
                setTitle(response?.data?.name);
                setPhoto(response?.data?.picture);
                setConversationUsers(response?.data?.users);
                setConversationDetails(response?.data);
            }
        });
    }, [conversationId, username]);

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
            conversationDetails?.name === title &&
            conversationDetails?.users === conversationUsers
        ) {
            setIsSave(false);
        } else if (conversationDetails) {
            setIsSave(true);
        }
    }, [conversationDetails, conversationUsers, isGroup, photo, title]);

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

    const removeUserFromChat = useCallback(() => {}, []);

    const onPressUser = useCallback(
        (value: string) => {
            const options = ['Remove from chat', 'Cancel'];

            showActionSheetWithOptions(
                {
                    cancelButtonIndex: 1,
                    options,
                    userInterfaceStyle: 'dark',
                    title: value
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        removeUserFromChat();
                    }
                }
            );
        },
        [removeUserFromChat, showActionSheetWithOptions]
    );

    const deleteChat = useCallback(() => {}, []);

    const leaveChat = useCallback(() => {}, []);

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
                            {conversationUsers?.map(
                                (value) =>
                                    value.username !== username && (
                                        <TouchableOpacity
                                            key={value.username}
                                            onPress={() =>
                                                onPressUser(value.username)
                                            }
                                            onLongPress={() =>
                                                onPressUser(value.username)
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
                                                style={
                                                    ChatDetailScreenStyle.peopleText
                                                }
                                            >
                                                {value?.firstname}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                            )}
                        </View>
                    </>
                ) : (
                    <Text style={ChatDetailScreenStyle.title}>{title}</Text>
                )}
            </View>
            {createdBy === username ? (
                <ListItem title="Delete chat" onPress={deleteChat} />
            ) : (
                <ListItem title="Leave chat" onPress={leaveChat} />
            )}
        </ScrollView>
    );
};
