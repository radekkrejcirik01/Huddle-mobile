import React, { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input } from '@components/general/Input/Input';
import { InputTypeEnum } from '@components/general/Input/Input.enum';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RegistrationScreenStyle } from '@screens/login/RegistrationScreen/RegistrationScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { UserPostInterface } from '@interfaces/post/Post.inteface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';

export const RegistrationScreen = (): JSX.Element => {
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const create = useCallback(() => {
        postRequestUser<AuthResponseInterface, UserPostInterface>('user', {
            username,
            firstname,
            password
        }).subscribe((response: AuthResponseInterface) => {
            if (response?.status) {
                if (response?.message?.includes('exists')) {
                    Alert.alert('This username is already taken');
                } else {
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
            <View style={RegistrationScreenStyle.inputsContainer}>
                <Input
                    placeholder="firstname"
                    onChange={setFirstname}
                    inputType={InputTypeEnum.TEXT}
                    iconRight={<Icon name={IconEnum.PROFILE} size={24} />}
                />
                <Input
                    placeholder="username"
                    onChange={setUsername}
                    inputType={InputTypeEnum.TEXT}
                    iconRight={<Icon name={IconEnum.PROFILE} size={24} />}
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
                onPress={create}
                style={RegistrationScreenStyle.button}
            >
                <Text style={RegistrationScreenStyle.buttonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
};
