import React, { useCallback, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RegistrationScreenStyle } from '@screens/login/RegistrationScreen/RegistrationScreen.style';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { UserPostInterface } from '@interfaces/post/Post.inteface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { ActivityService } from '@utils/general/ActivityService';

export const RegistrationScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    const [firstname, setFirstname] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const create = useCallback(() => {
        if (!firstname?.length) {
            Alert.alert('Please enter name for your account');
            return;
        }
        if (!username?.length) {
            Alert.alert('Please enter username for your account');
            return;
        }
        if (!password?.length) {
            Alert.alert('Please enter password for your account');
            return;
        }

        postRequestUser<AuthResponseInterface, UserPostInterface>('user', {
            username,
            firstname,
            password
        }).subscribe((response: AuthResponseInterface) => {
            if (response?.status) {
                if (response?.message?.includes('exists')) {
                    Alert.alert('This username is already taken');
                } else {
                    ActivityService.updateOnline();

                    dispatch(setUserToken(response?.token));

                    PersistStorage.setItem(
                        PersistStorageKeys.TOKEN,
                        response?.token
                    ).catch();

                    PreloadService.loadUserObject();
                }
            }
        });
    }, [dispatch, firstname, password, username]);

    return (
        <View style={RegistrationScreenStyle.container}>
            <KeyboardAvoidingView keyboardVerticalOffset={50}>
                <View style={RegistrationScreenStyle.inputsContainer}>
                    <Input
                        placeholder="Name"
                        autoFocus
                        onChange={setFirstname}
                        inputType={InputTypeEnum.TEXT}
                        iconRight={<Icon name={IconEnum.PROFILE} size={24} />}
                        viewStyle={RegistrationScreenStyle.inputView}
                    />
                    <Input
                        placeholder="Username"
                        onChange={setUsername}
                        inputType={InputTypeEnum.TEXT}
                        iconRight={<Icon name={IconEnum.PROFILE} size={24} />}
                        viewStyle={[
                            RegistrationScreenStyle.inputMarginTop,
                            RegistrationScreenStyle.inputView
                        ]}
                    />
                    <Input
                        placeholder="Password"
                        onChange={setPassword}
                        inputType={InputTypeEnum.PASSWORD}
                        viewStyle={[
                            RegistrationScreenStyle.inputMarginTop,
                            RegistrationScreenStyle.inputView
                        ]}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigateTo(LoginStackNavigatorEnum.PrivacyScreen)
                    }
                >
                    <Text style={RegistrationScreenStyle.privacyText}>
                        By creating account you agree with our{' '}
                        <Text style={RegistrationScreenStyle.bold}>
                            privacy policy
                        </Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={create}
                    style={RegistrationScreenStyle.button}
                >
                    <Text style={RegistrationScreenStyle.buttonText}>
                        Create
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};
