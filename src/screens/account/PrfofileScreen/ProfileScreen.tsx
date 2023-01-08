import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { ListItem } from '@components/general/ListItem/ListItem';
import { ProfileScreenStyle } from '@screens/account/PrfofileScreen/ProfileScreen.style';
import { useDispatch } from 'react-redux';
import { resetUserState } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';

export const ProfileScreen = (): JSX.Element => {
    const [switchNotificationsValue, setSwitchNotificationsValue] =
        useState<boolean>(false);

    const dispatch = useDispatch();

    const openAccountScreen = () => {
        Alert.alert('open');
    };

    const toggleNotification = (value: boolean) => {
        Alert.alert(JSON.stringify(value));
        setSwitchNotificationsValue(value);
    };

    const openHelpCenterScreen = () => {};

    const openPrivacyPolicyScreen = () => {};

    const logOut = useCallback(() => {
        dispatch(resetUserState());
        PersistStorage.setItem(PersistStorageKeys.TOKEN, '').catch();
    }, [dispatch]);

    return (
        <View>
            <ListItem title="Account" hasArrow onPress={openAccountScreen} />
            <ListItem
                title="Receive notification"
                switchValue={switchNotificationsValue}
                hasSwitch
                toggleSwitch={toggleNotification}
            />
            <ListItem
                title="Help center"
                hasArrow
                onPress={openHelpCenterScreen}
            />
            <ListItem
                title="Privacy policy"
                hasArrow
                onPress={openPrivacyPolicyScreen}
            />
            <ListItem
                title="Log Out"
                onPress={logOut}
                style={ProfileScreenStyle.lastItem}
            />
        </View>
    );
};
