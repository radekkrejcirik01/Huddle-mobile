import React, { useCallback, useMemo, useState } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Icon } from '@components/icon/Icon';
import { IconEnum } from '@components/icon/Icon.enum';
import { RegistrationScreenStyle } from '@screens/login/RegistrationScreen/RegistrationScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { setUserStateAction } from '@store/UserReducer';

export const RegistrationScreen = (): JSX.Element => {
    const [firstname, setFirstname] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const dispatch = useDispatch();

    const iconLeftStyle = useMemo(
        (): StyleProp<TextStyle> => [
            RegistrationScreenStyle.usernameIconLeft,
            username && RegistrationScreenStyle.colorWhite
        ],
        [username]
    );

    const confirmPressed = useCallback(() => {
        dispatch(setUserStateAction({ firstname, username }));
    }, [dispatch, firstname, username]);

    return (
        <View style={RegistrationScreenStyle.container}>
            <View style={RegistrationScreenStyle.inputsContainer}>
                <Input
                    placeholder="first name"
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
                    placeholder="password"
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
