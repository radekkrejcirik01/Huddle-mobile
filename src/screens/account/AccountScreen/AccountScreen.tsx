import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from '@components/general/ListItem/ListItem';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { AccountScreenStyle } from '@screens/account/AccountScreen/AccountScreen.style';

export const AccountScreen = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openChangePassword = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ChangePasswordScreen);
    }, [navigateTo]);

    const openDeleteAccount = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.DeleteAccountScreen);
    }, [navigateTo]);

    return (
        <ScrollView style={AccountScreenStyle.container}>
            <ListItem
                title="Change password"
                hasArrow
                onPress={openChangePassword}
            />
            <ListItem
                title="Delete account"
                hasArrow
                onPress={openDeleteAccount}
            />
        </ScrollView>
    );
};
