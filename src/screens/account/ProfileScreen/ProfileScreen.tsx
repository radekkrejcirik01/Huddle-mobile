import React, { useCallback } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SectionList } from '@components/general/SectionList/SectionList';

export const ProfileScreen = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const onProfileSettingsPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.SettingsScreen);
    }, [navigateTo]);

    const onPeoplePress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.PeopleScreen);
    }, [navigateTo]);

    const onHangoutsPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.HangoutsScreen);
    }, [navigateTo]);

    const onNotificationsPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.NotificationsScreen);
    }, [navigateTo]);

    const onMessagesPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.MessagesScreen);
    }, [navigateTo]);

    return (
        <SafeAreaView style={ProfileScreenStyle.safeArea}>
            <View style={ProfileScreenStyle.container}>
                <View style={ProfileScreenStyle.header}>
                    <TouchableOpacity onPress={onProfileSettingsPress}>
                        <FastImage
                            source={require('@assets/images/profilovka.png')}
                            style={ProfileScreenStyle.image}
                        />
                    </TouchableOpacity>
                    <View style={ProfileScreenStyle.headerInnerContainer}>
                        <View style={ProfileScreenStyle.numbersContainer}>
                            <TouchableOpacity onPress={onPeoplePress}>
                                <Text style={ProfileScreenStyle.number}>
                                    12
                                </Text>
                                <Text style={ProfileScreenStyle.title}>
                                    People
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onHangoutsPress}
                                style={ProfileScreenStyle.hangoutsContainer}
                            >
                                <Text style={ProfileScreenStyle.number}>
                                    32
                                </Text>
                                <Text style={ProfileScreenStyle.title}>
                                    Hangouts
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileScreenStyle.iconContainer}>
                            <IconButton
                                icon={IconEnum.BELL}
                                onPress={onNotificationsPress}
                                size={25}
                                style={ProfileScreenStyle.bellIcon}
                            />
                            <IconButton
                                icon={IconEnum.CHAT_FILLED}
                                onPress={onMessagesPress}
                                size={26}
                            />
                        </View>
                    </View>
                </View>
                <View style={ProfileScreenStyle.comingsUpContainer}>
                    <Text style={ProfileScreenStyle.comingsUpTitle}>
                        Comings up
                    </Text>
                    <SectionList />
                </View>
            </View>
        </SafeAreaView>
    );
};
