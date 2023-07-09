import React, { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import { ListItem } from '@components/general/ListItem/ListItem';
import { resetUserState, setProfilePhotoAction } from '@store/UserReducer';
import { deleteRequestUser, postRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseUploadImageInterface
} from '@interfaces/response/Response.interface';
import { ReducerProps } from '@store/index/index.props';
import { UploadProfileImageInterface } from '@interfaces/post/Post.inteface';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountScreenStyle } from '@screens/account/AccountScreen/AccountScreen.style';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const AccountScreen = (): JSX.Element => {
    const { firstname, username, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const dispatch = useDispatch();

    const changeProfilePhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            dispatch(setProfilePhotoAction(image?.path));

            postRequestUser<
                ResponseUploadImageInterface,
                UploadProfileImageInterface
            >('photo', {
                buffer: base64,
                fileName: image.filename
            }).subscribe((response: ResponseUploadImageInterface) => {
                if (!response?.status) {
                    Alert.alert("Sorry, we couldn't upload this image 😔");
                }
            });
        });
    }, [dispatch]);

    const logout = useCallback(() => {
        deleteRequestUser<ResponseInterface>('device').subscribe(
            (response: ResponseInterface) => {
                if (response?.status) {
                    dispatch(resetUserState());
                    PersistStorage.setItem(
                        PersistStorageKeys.TOKEN,
                        ''
                    ).catch();
                }
            }
        );
    }, [dispatch]);

    return (
        <View style={AccountScreenStyle.container}>
            <View style={AccountScreenStyle.infoContainer}>
                <TouchableOpacity onPress={changeProfilePhoto}>
                    <ProfilePhoto
                        name={firstname}
                        photo={profilePhoto}
                        size={100}
                    />
                </TouchableOpacity>
                <Text style={AccountScreenStyle.firstname}>{firstname}</Text>
                <Text style={AccountScreenStyle.username}>@{username}</Text>
            </View>
            <View style={AccountScreenStyle.buttons}>
                <ListItem title="Logout" onPress={logout} hasArrow />
            </View>
        </View>
    );
};
