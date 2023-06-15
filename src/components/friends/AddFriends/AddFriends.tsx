import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useModal } from '@hooks/useModal';
import { useNavigation } from '@hooks/useNavigation';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import COLORS from '@constants/COLORS';
import { Modal } from '@components/general/Modal/Modal';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AddPersonInvitePostInterface } from '@interfaces/post/Post.inteface';
import { ReducerProps } from '@store/index/index.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { AddFriendsStyle } from '@components/friends/AddFriends/AddFriends.style';
import { Icon } from '@components/general/Icon/Icon';
import { Badge } from '@components/general/Badge/Badge';

export const AddFriends = (): JSX.Element => {
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
            <View style={AddFriendsStyle.modalContainer}>
                <View style={AddFriendsStyle.inputContainer}>
                    <Text style={AddFriendsStyle.title}>Username</Text>
                    <View style={AddFriendsStyle.inputView}>
                        <Text>✉️</Text>
                        <Text style={AddFriendsStyle.at}>@</Text>
                        <TextInput
                            autoFocus
                            value={username}
                            onChangeText={setUsername}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardAppearance="light"
                            selectionColor={COLORS.WHITE}
                            style={AddFriendsStyle.input}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onSend}
                    style={AddFriendsStyle.sendButton}
                >
                    <Text style={AddFriendsStyle.sendButtonText}>
                        Send invite
                    </Text>
                </TouchableOpacity>
            </View>
        ),
        [onSend, username]
    );

    return (
        <View style={AddFriendsStyle.view}>
            <TouchableOpacity
                onPress={showModal}
                style={AddFriendsStyle.addView}
            >
                <Text style={AddFriendsStyle.addText}>
                    Add<Text style={AddFriendsStyle.letterSpacing}>🧍‍♀️🧍‍♂️</Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.InvitesScreen)
                }
                style={AddFriendsStyle.invitesView}
            >
                <Icon name={IconEnum.PROFILE} size={22} />
                <Badge value={1} />
            </TouchableOpacity>
            <Modal
                isVisible={modalVisible}
                content={content}
                backdropOpacity={0.7}
                onClose={hideKeyboardAndModal}
            />
        </View>
    );
};
