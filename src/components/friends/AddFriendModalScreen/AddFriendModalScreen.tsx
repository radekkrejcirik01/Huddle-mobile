import React, { useCallback, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import COLORS from '@constants/COLORS';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AddPersonInvitePostInterface } from '@interfaces/post/Post.inteface';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AddFriendModalScreenProps } from '@components/friends/AddFriendModalScreen/AddFriendModalScreen.props';
import { AddFriendModalScreenStyle } from '@components/friends/AddFriendModalScreen/AddFriendModalScreen.style';

export const AddFriendModalScreen = ({
    onClose
}: AddFriendModalScreenProps): JSX.Element => {
    const [username, setUsername] = useState<string>();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const hide = useCallback(() => {
        setUsername('');

        onClose();
    }, [onClose]);

    const onSend = useCallback(() => {
        postRequestUser<ResponseInterface, AddPersonInvitePostInterface>(
            '/person',
            {
                receiver: username
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                if (response?.message?.includes('notifications')) {
                    Alert.alert(response?.message, '', [
                        {
                            text: 'Go to noifications',
                            onPress: () => {
                                hide();
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
                    hide();
                }
            }
        });
    }, [hide, navigateTo, username]);

    return (
        <View style={AddFriendModalScreenStyle.modalContainer}>
            <View style={AddFriendModalScreenStyle.inputContainer}>
                <Text style={AddFriendModalScreenStyle.title}>Username</Text>
                <View style={AddFriendModalScreenStyle.inputView}>
                    <TextInput
                        autoFocus
                        value={username}
                        onChangeText={setUsername}
                        autoCorrect={false}
                        autoCapitalize="none"
                        selectionColor={COLORS.WHITE}
                        style={AddFriendModalScreenStyle.input}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={onSend}
                style={AddFriendModalScreenStyle.sendButton}
            >
                <Text style={AddFriendModalScreenStyle.sendButtonText}>
                    Send invite
                </Text>
            </TouchableOpacity>
        </View>
    );
};
