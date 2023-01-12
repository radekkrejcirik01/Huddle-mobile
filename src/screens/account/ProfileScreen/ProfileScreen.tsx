import React, { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { ListItem } from '@components/general/ListItem/ListItem';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { resetUserState } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { ReducerProps } from '@store/index/index.props';
import { useNavigation } from '@hooks/useNavigation';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const ProfileScreen = (): JSX.Element => {
    const { firstname, username, profilePicture } = useSelector(
        (state: ReducerProps) => state.user.user
    );
    const dispatch = useDispatch();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const changeProfilePicture = useCallback(() => {
        Alert.alert('A');
    }, []);

    const openAccountScreen = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.AccountScreen);
    }, [navigateTo]);

    const logOut = useCallback(() => {
        dispatch(resetUserState());
        PersistStorage.setItem(PersistStorageKeys.TOKEN, '').catch();
    }, [dispatch]);

    return (
        <View style={ProfileScreenStyle.container}>
            <View style={ProfileScreenStyle.infoContainer}>
                <TouchableOpacity onPress={changeProfilePicture}>
                    <FastImage
                        source={require('../../../assets/images/profilovka.png')}
                        style={ProfileScreenStyle.image}
                    />
                </TouchableOpacity>
                <Text style={ProfileScreenStyle.firstname}>{firstname}</Text>
                <Text style={ProfileScreenStyle.username}>@{username}</Text>
            </View>
            <View style={ProfileScreenStyle.buttons}>
                <ListItem
                    title="Account"
                    hasArrow
                    onPress={openAccountScreen}
                />
                <ListItem title="Log Out" onPress={logOut} />
            </View>
        </View>
    );
};
