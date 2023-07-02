import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
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
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { LoginPostInterface } from '@interfaces/post/Post.inteface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';

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

    const createAccount = useCallback(
        () => navigateTo(LoginStackNavigatorEnum.RegistrationScreen),
        [navigateTo]
    );

    return (
        <>
            <View style={LoginScreenStyle.inputsContainer}>
                <Input
                    placeholder="username"
                    onChange={setUsername}
                    inputType={InputTypeEnum.TEXT}
                    iconRight={<Icon name={IconEnum.PROFILE} size={24} />}
                />
                <Input
                    placeholder="password"
                    onChange={setPassword}
                    inputType={InputTypeEnum.PASSWORD}
                    viewStyle={LoginScreenStyle.inputView}
                />
            </View>
            <TouchableOpacity
                onPress={loginPressed}
                style={LoginScreenStyle.loginButtonView}
            >
                <Text style={LoginScreenStyle.loginButtonText}>Log in 👉</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={createAccount}
                style={LoginScreenStyle.registerButtonView}
            >
                <Text style={LoginScreenStyle.registerButtonText}>
                    Create account
                </Text>
            </TouchableOpacity>
        </>
    );
};
