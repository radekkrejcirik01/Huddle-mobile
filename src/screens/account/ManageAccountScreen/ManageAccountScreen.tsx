import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ListItem } from '@components/general/ListItem/ListItem';
import { deleteRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { resetUserState } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { ManageAccountScreenStyle } from '@screens/account/ManageAccountScreen/ManageAccountScreen.style';

export const ManageAccountScreen = (): JSX.Element => {
    const dispatch = useDispatch();

    const deleteConfirmed = useCallback(() => {
        deleteRequestUser<ResponseInterface>('account').subscribe(
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

    const deleteAccount = useCallback(() => {
        Alert.alert(
            'Are you sure you want to delete account?',
            'This action will delete everything including conversations',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: deleteConfirmed,
                    style: 'destructive'
                }
            ]
        );
    }, [deleteConfirmed]);

    return (
        <View style={ManageAccountScreenStyle.container}>
            <ListItem title="Delete account" onPress={deleteAccount} />
        </View>
    );
};
