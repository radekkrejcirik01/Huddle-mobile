import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { SettingsScreenStyle } from '@screens/account/SettingsScreen/SettingsScreen.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const SettingsScreen = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openAccount = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.AccountScreen);
    }, [navigateTo]);

    const openPrivacy = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.PrivacyScreen);
    }, [navigateTo]);

    const openHideFrom = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.HideFromScreen);
    }, [navigateTo]);

    const openMuted = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.MutedScreen);
    }, [navigateTo]);

    const openNotifications = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.NotificationsScreen);
    }, [navigateTo]);

    return (
        <ScrollView contentContainerStyle={SettingsScreenStyle.container}>
            <View style={SettingsScreenStyle.box}>
                <TouchableOpacity
                    onPress={openAccount}
                    style={SettingsScreenStyle.view}
                >
                    <View style={SettingsScreenStyle.titleView}>
                        <Text style={SettingsScreenStyle.titleEmoji}>🥳</Text>
                        <Text style={SettingsScreenStyle.titleText}>
                            Account
                        </Text>
                    </View>
                    <Icon
                        name={IconEnum.BACK_RIGHT}
                        size={12}
                        style={SettingsScreenStyle.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openPrivacy}
                    style={SettingsScreenStyle.view}
                >
                    <View style={SettingsScreenStyle.titleView}>
                        <Text style={SettingsScreenStyle.titleEmoji}>🙇‍♂️</Text>
                        <Text style={SettingsScreenStyle.titleText}>
                            Privacy
                        </Text>
                    </View>
                    <Icon
                        name={IconEnum.BACK_RIGHT}
                        size={12}
                        style={SettingsScreenStyle.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={SettingsScreenStyle.box}>
                <TouchableOpacity
                    onPress={openHideFrom}
                    style={SettingsScreenStyle.view}
                >
                    <View style={SettingsScreenStyle.titleView}>
                        <Text style={SettingsScreenStyle.titleEmoji}>👀</Text>
                        <Text style={SettingsScreenStyle.titleText}>
                            Hide from
                        </Text>
                    </View>
                    <Icon
                        name={IconEnum.BACK_RIGHT}
                        size={12}
                        style={SettingsScreenStyle.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openMuted}
                    style={SettingsScreenStyle.view}
                >
                    <View style={SettingsScreenStyle.titleView}>
                        <Text style={SettingsScreenStyle.titleEmoji}>🔇</Text>
                        <Text style={SettingsScreenStyle.titleText}>Muted</Text>
                    </View>
                    <Icon
                        name={IconEnum.BACK_RIGHT}
                        size={12}
                        style={SettingsScreenStyle.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={SettingsScreenStyle.box}>
                <TouchableOpacity
                    onPress={openNotifications}
                    style={SettingsScreenStyle.view}
                >
                    <View style={SettingsScreenStyle.titleView}>
                        <Text style={SettingsScreenStyle.titleEmoji}>📲</Text>
                        <Text style={SettingsScreenStyle.titleText}>
                            Notifications
                        </Text>
                    </View>
                    <Icon
                        name={IconEnum.BACK_RIGHT}
                        size={12}
                        style={SettingsScreenStyle.icon}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};