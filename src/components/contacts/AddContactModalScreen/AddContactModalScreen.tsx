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
import { AddContactModalScreenProps } from '@components/contacts/AddContactModalScreen/AddContactModalScreen.props';
import { AddContactModalScreenStyle } from '@components/contacts/AddContactModalScreen/AddContactModalScreen.style';

export const AddContactModalScreen = ({
    onClose
}: AddContactModalScreenProps): JSX.Element => {
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
        <View style={AddContactModalScreenStyle.modalContainer}>
            <View style={AddContactModalScreenStyle.inputContainer}>
                <Text style={AddContactModalScreenStyle.title}>Username</Text>
                <View style={AddContactModalScreenStyle.inputView}>
                    <TextInput
                        autoFocus
                        value={username}
                        onChangeText={setUsername}
                        autoCorrect={false}
                        autoCapitalize="none"
                        selectionColor={COLORS.WHITE}
                        style={AddContactModalScreenStyle.input}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={onSend}
                style={AddContactModalScreenStyle.sendButton}
            >
                <Text style={AddContactModalScreenStyle.sendButtonText}>
                    Invite
                </Text>
            </TouchableOpacity>
        </View>
    );
};
