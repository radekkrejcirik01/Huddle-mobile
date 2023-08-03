import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';
import { ReducerProps } from '@store/index/index.props';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleLikePostInterface } from '@interfaces/post/Post.inteface';

export const useHuddleActions = (
    onLiked?: () => void
): {
    openHuddleActions: (item: HuddleItemInterface) => void;
    onHuddleLikePress: (item: HuddleItemInterface) => void;
    openHuddleProfile: (item: HuddleItemInterface) => void;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { showActionSheetWithOptions } = useActionSheet();
    const openProfilePhoto = useOpenProfilePhoto();
    const navigation = useNavigation();

    const deleteHuddle = useCallback(
        (id: number) =>
            deleteRequestUser<ResponseInterface>(`huddle/${id}`).subscribe(
                (response: ResponseInterface) => {
                    if (response?.status) {
                        navigation.goBack();
                    }
                }
            ),
        [navigation]
    );

    const deleteHuddleMessage = useCallback(
        (id: number) =>
            Alert.alert('Delete Huddle', '', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deleteHuddle(id),
                    style: 'destructive'
                }
            ]),
        [deleteHuddle]
    );

    const openHuddleActions = useCallback(
        (item: HuddleItemInterface) => {
            const options = [
                'Report',
                item.sender === username && 'Delete',
                'Cancel'
            ].filter(Boolean);

            showActionSheetWithOptions(
                {
                    options,
                    title: 'Huddle actions',
                    cancelButtonIndex: options?.length - 1,
                    destructiveButtonIndex:
                        item.sender === username ? 1 : undefined,
                    userInterfaceStyle: 'dark'
                },
                (selectedIndex: number) => {
                    if (options[selectedIndex] === 'Report') {
                        Alert.alert(
                            'Thank you for reporting, our team will take a look 🧡'
                        );
                    }
                    if (options[selectedIndex] === 'Delete') {
                        deleteHuddleMessage(item.id);
                    }
                }
            );
        },
        [deleteHuddleMessage, showActionSheetWithOptions, username]
    );

    const likeHuddle = useCallback(
        (huddleId: number, message: string, createdBy: string) =>
            postRequestUser<ResponseInterface, HuddleLikePostInterface>(
                'huddle/like',
                {
                    huddleId,
                    message,
                    receiver: createdBy
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    onLiked();
                }
            }),
        [onLiked]
    );

    const removeHuddleLike = useCallback(
        (huddleId: number) =>
            deleteRequestUser<ResponseInterface>(`like/${huddleId}`).subscribe(
                (response: ResponseInterface) => {
                    if (response?.status) {
                        onLiked();
                    }
                }
            ),
        [onLiked]
    );

    const onHuddleLikePress = (item: HuddleItemInterface) => {
        if (!item?.liked) {
            likeHuddle(item.id, item.message, item.sender);
        } else {
            removeHuddleLike(item.id);
        }
    };

    const openHuddleProfile = useCallback(
        (item: HuddleItemInterface) => {
            openProfilePhoto(item.name, item?.profilePhoto);
        },
        [openProfilePhoto]
    );

    return { openHuddleActions, onHuddleLikePress, openHuddleProfile };
};