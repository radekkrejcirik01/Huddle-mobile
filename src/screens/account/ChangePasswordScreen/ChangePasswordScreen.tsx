import React, { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ReducerProps } from '@store/index/index.props';
import { ChangePasswordScreenStyle } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen.style';
import { useCognito } from '@hooks/useCognito';

export const ChangePasswordScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { changePassword } = useCognito();

    const [oldPassword, setOldPassword] = useState<string>(null);
    const [newPassword, setNewPassword] = useState<string>(null);

    const change = useCallback(() => {
        if (!oldPassword && !newPassword) {
            Alert.alert('Please enter passwords');
            return;
        }
        if (!oldPassword) {
            Alert.alert('Please enter old password');
            return;
        }
        if (!newPassword) {
            Alert.alert('Please enter new password');
            return;
        }
        if (oldPassword === newPassword) {
            Alert.alert('Old password is same as new password');
            return;
        }

        changePassword(username, oldPassword, newPassword);
    }, [changePassword, newPassword, oldPassword, username]);

    return (
        <View style={ChangePasswordScreenStyle.container}>
            <Text style={ChangePasswordScreenStyle.title}>Old password</Text>
            <Input
                value={oldPassword}
                onChange={setOldPassword}
                inputType={InputTypeEnum.PASSWORD}
                autoFocus
            />
            <Text
                style={[
                    ChangePasswordScreenStyle.title,
                    ChangePasswordScreenStyle.marginTop
                ]}
            >
                New password
            </Text>
            <Input
                value={newPassword}
                onChange={setNewPassword}
                inputType={InputTypeEnum.PASSWORD}
            />
            <KeyboardAvoidingView
                behavior="padding"
                style={ChangePasswordScreenStyle.keyboardAvoiding}
                keyboardVerticalOffset={0}
            >
                <TouchableOpacity onPress={change}>
                    <Text style={ChangePasswordScreenStyle.confirm}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};
