import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import { FriendsPlusStyle } from '@components/general/FriendsPlus/FriendsPlus.style';
import { useModal } from '@hooks/useModal';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import COLORS from '@constants/COLORS';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { FriendCreateInvitationPostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const FriendsPlus = (): JSX.Element => {
    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { showActionSheetWithOptions } = useActionSheet();

    const { modalVisible, showModal, hideModal } = useModal();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [username, setUsername] = useState<string>();

    const hideKeyboardAndModal = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const onSend = useCallback(() => {
        postRequest<ResponseInterface, FriendCreateInvitationPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/create/people/invitation',
            {
                user,
                username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                if (response?.message?.includes('notifications')) {
                    Alert.alert(response?.message, '', [
                        {
                            text: 'Go to noifications',
                            onPress: () => {
                                hideKeyboardAndModal();
                                navigateTo(
                                    AccountStackNavigatorEnum.NotificationsScreen
                                );
                            }
                        },
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ]);
                } else {
                    Alert.alert(response?.message);
                }

                if (response?.message?.includes('✅')) {
                    setUsername(null);
                }
            }
        });
    }, [hideKeyboardAndModal, navigateTo, user, username]);

    const content = useMemo(
        (): JSX.Element => (
            <View style={FriendsPlusStyle.modalContainer}>
                <Text style={FriendsPlusStyle.title}>Add a friend</Text>
                <Input
                    autoFocus
                    iconLeft={<Text>✉️</Text>}
                    placeholder="Username"
                    value={username}
                    onChange={setUsername}
                    inputType={InputTypeEnum.TEXT}
                    inputStyle={FriendsPlusStyle.input}
                    viewStyle={FriendsPlusStyle.inputView}
                    placeholderTextColor={COLORS.LIGHTGRAY}
                />
                <TouchableOpacity
                    onPress={onSend}
                    style={FriendsPlusStyle.touchableOpacity}
                >
                    <Text style={FriendsPlusStyle.sendButton}>Send</Text>
                </TouchableOpacity>
            </View>
        ),
        [onSend, username]
    );

    const showActionSheet = useCallback(() => {
        const options = ['Add a friend', 'Cancel'];

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: 1,
                userInterfaceStyle: 'dark'
            },
            (selectedIndex: number) => {
                if (selectedIndex === 0) {
                    showModal();
                }
            }
        );
    }, [showActionSheetWithOptions, showModal]);

    return (
        <>
            <IconButton
                icon={IconEnum.PLUS}
                size={25}
                onPress={showActionSheet}
                style={FriendsPlusStyle.iconButton}
            />
            <Modal
                isVisible={modalVisible}
                content={content}
                backdropOpacity={0.7}
                onClose={hideKeyboardAndModal}
            />
        </>
    );
};
