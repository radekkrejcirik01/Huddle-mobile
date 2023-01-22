import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Icon } from '@components/icon/Icon';
import { IconEnum } from '@components/icon/Icon.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginScreenStyle } from '@screens/login/LoginScreen/LoginScreen.style';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { useCognito } from '@hooks/useCognito';

export const LoginScreen = (): JSX.Element => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);
    const { login } = useCognito();

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const loginPressed = useCallback(() => {
        login(username, password);
    }, [login, password, username]);

    const registerPressed = useCallback(() => {
        navigateTo(LoginStackNavigatorEnum.RegistrationScreen);
    }, [navigateTo]);

    return (
        <>
            <View style={LoginScreenStyle.inputsContainer}>
                <Input
                    placeholder="Username"
                    onChange={setUsername}
                    inputType={InputTypeEnum.TEXT}
                    iconRight={<Icon name={IconEnum.PROFILE} size={25} />}
                />
                <Input
                    placeholder="Password"
                    onChange={setPassword}
                    inputType={InputTypeEnum.PASSWORD}
                    viewStyle={LoginScreenStyle.inputView}
                />
            </View>
            <TouchableOpacity onPress={loginPressed}>
                <Text style={LoginScreenStyle.loginText}>Log In 👉</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={registerPressed}>
                <Text style={LoginScreenStyle.registerText}>
                    No account yet? Create one!
                </Text>
            </TouchableOpacity>
        </>
    );
};
