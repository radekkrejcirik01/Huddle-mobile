import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useModal } from '@hooks/useModal';
import { useNavigation } from '@hooks/useNavigation';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import COLORS from '@constants/COLORS';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AddPersonInvitePostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { AddFriendStyle } from '@components/friends/AddFriend/AddFriend.style';

export const AddFriend = (): JSX.Element => {
    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { modalVisible, showModal, hideModal } = useModal();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [username, setUsername] = useState<string>();

    const hideKeyboardAndModal = useCallback(() => {
        setUsername('');
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const onSend = useCallback(() => {
        postRequestUser<ResponseInterface, AddPersonInvitePostInterface>(
            '/person',
            {
                sender: user,
                receiver: username
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
                    hideKeyboardAndModal();
                }
            }
        });
    }, [hideKeyboardAndModal, navigateTo, user, username]);

    const content = useMemo(
        (): JSX.Element => (
            <View style={AddFriendStyle.modalContainer}>
                <View style={AddFriendStyle.inputContainer}>
                    <Text style={AddFriendStyle.title}>Username</Text>
                    <View style={AddFriendStyle.inputView}>
                        <Text>✉️</Text>
                        <Text style={AddFriendStyle.hashtag}>@</Text>
                        <TextInput
                            autoFocus
                            value={username}
                            onChangeText={setUsername}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardAppearance="light"
                            selectionColor={COLORS.WHITE}
                            style={AddFriendStyle.input}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onSend}
                    style={AddFriendStyle.sendButton}
                >
                    <Text style={AddFriendStyle.sendButtonText}>
                        Send invite
                    </Text>
                </TouchableOpacity>
            </View>
        ),
        [onSend, username]
    );

    return (
        <>
            <IconButton icon={IconEnum.PLUS} onPress={showModal} size={24} />
            <Modal
                isVisible={modalVisible}
                content={content}
                backdropOpacity={0.7}
                onClose={hideKeyboardAndModal}
            />
        </>
    );
};
