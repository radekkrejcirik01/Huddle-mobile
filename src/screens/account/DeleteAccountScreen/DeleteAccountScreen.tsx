import React, { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { ReducerProps } from '@store/index/index.props';
import { DeleteAccountScreenStyle } from '@screens/account/DeleteAccountScreen/DeleteAccountScreen.style';
import { useCognito } from '@hooks/useCognito';

export const DeleteAccountScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateBack } = useNavigation();
    const { deleteAccount } = useCognito();

    const onPressDelete = useCallback(() => {
        Alert.prompt(
            'Delete account',
            'Account cannot be restored',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: (password: string) =>
                        deleteAccount(username, password),
                    style: 'destructive'
                }
            ],
            'secure-text'
        );
    }, [deleteAccount, username]);

    return (
        <View style={DeleteAccountScreenStyle.container}>
            <Text style={DeleteAccountScreenStyle.title}>
                We are sorry to see you go. Are you sure you want to delete this
                account?
            </Text>
            <View style={DeleteAccountScreenStyle.buttonsContainer}>
                <TouchableOpacity onPress={onPressDelete}>
                    <Text style={DeleteAccountScreenStyle.confirm}>
                        Yes, delete
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateBack}>
                    <View style={DeleteAccountScreenStyle.notNowContainer}>
                        <Text style={DeleteAccountScreenStyle.notNow}>
                            Not now
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
