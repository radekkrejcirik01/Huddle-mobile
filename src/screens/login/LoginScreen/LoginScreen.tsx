import React, { useCallback, useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@hooks/useNavigation';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginScreenStyle } from '@screens/login/LoginScreen/LoginScreen.style';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { LoginPostInterface } from '@interfaces/post/Post.inteface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { LoginHeader } from '@components/login/LoginHeader/LoginHeader';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { ActivityService } from '@utils/general/ActivityService';

export const LoginScreen = (): JSX.Element => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    const loginPressed = useCallback(
        () =>
            postRequestUser<AuthResponseInterface, LoginPostInterface>(
                'login',
                {
                    username,
                    password
                }
            ).subscribe((response: AuthResponseInterface) => {
                if (response?.status) {
                    ActivityService.updateOnline();

                    dispatch(setUserToken(response?.token));

                    PersistStorage.setItem(
                        PersistStorageKeys.TOKEN,
                        response?.token
                    ).catch();

                    PreloadService.loadUserObject();
                } else {
                    Toast.show({
                        text1: 'Incorrect credentials',
                        text2: 'Please try again'
                    });
                }
            }),
        [dispatch, password, username]
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <LoginHeader />
                <KeyboardAvoidingView keyboardVerticalOffset={50}>
                    <View style={LoginScreenStyle.inputsContainer}>
                        <Input
                            placeholder="Username"
                            onChange={setUsername}
                            inputType={InputTypeEnum.TEXT}
                            iconRight={
                                <Icon name={IconEnum.PROFILE} size={24} />
                            }
                            viewStyle={LoginScreenStyle.usernameInputView}
                        />
                        <Input
                            placeholder="Password"
                            onChange={setPassword}
                            inputType={InputTypeEnum.PASSWORD}
                            viewStyle={LoginScreenStyle.passwordInputView}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={loginPressed}
                        style={LoginScreenStyle.loginButtonView}
                    >
                        <Text style={LoginScreenStyle.loginButtonText}>
                            Log in 👉
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={() =>
                        navigateTo(LoginStackNavigatorEnum.RegistrationScreen)
                    }
                    style={LoginScreenStyle.createAccountView}
                >
                    <Text style={LoginScreenStyle.createAccountText}>
                        Create account
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};
