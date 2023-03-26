import React, { useCallback, useMemo, useState } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RegistrationScreenStyle } from '@screens/login/RegistrationScreen/RegistrationScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useCognito } from '@hooks/useCognito';

export const RegistrationScreen = (): JSX.Element => {
    const [firstname, setFirstname] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const { register } = useCognito();

    const iconLeftStyle = useMemo(
        (): StyleProp<TextStyle> => [
            RegistrationScreenStyle.usernameIconLeft,
            username && RegistrationScreenStyle.colorWhite
        ],
        [username]
    );

    const confirmPressed = useCallback(() => {
        register(firstname, username, password);
    }, [firstname, password, register, username]);

    return (
        <View style={RegistrationScreenStyle.container}>
            <View style={RegistrationScreenStyle.inputsContainer}>
                <Input
                    placeholder="Firstname"
                    onChange={setFirstname}
                    inputType={InputTypeEnum.TEXT}
                    iconRight={<Icon name={IconEnum.PROFILE} size={25} />}
                />
                <Input
                    placeholder="username"
                    iconLeft={<Text style={iconLeftStyle}>@</Text>}
                    onChange={setUsername}
                    inputType={InputTypeEnum.TEXT}
                    iconRight={<Icon name={IconEnum.PROFILE} size={25} />}
                    viewStyle={RegistrationScreenStyle.inputView}
                />
                <Input
                    placeholder="Password"
                    onChange={setPassword}
                    inputType={InputTypeEnum.PASSWORD}
                    viewStyle={RegistrationScreenStyle.inputView}
                />
            </View>
            <TouchableOpacity
                onPress={confirmPressed}
                style={RegistrationScreenStyle.button}
            >
                <Text style={RegistrationScreenStyle.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};
