import React, { useCallback } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SectionList } from '@components/general/SectionList/SectionList';

export const HomeScreen = (): JSX.Element => {
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
        <SafeAreaView style={HomeScreenStyle.safeArea}>
            <View style={HomeScreenStyle.container}>
                <View style={HomeScreenStyle.header}>
                    <TouchableOpacity onPress={onProfileSettingsPress}>
                        <FastImage
                            source={require('@assets/images/profilovka.png')}
                            style={HomeScreenStyle.image}
                        />
                    </TouchableOpacity>
                    <View style={HomeScreenStyle.headerInnerContainer}>
                        <View style={HomeScreenStyle.numbersContainer}>
                            <TouchableOpacity onPress={onPeoplePress}>
                                <Text style={HomeScreenStyle.number}>12</Text>
                                <Text style={HomeScreenStyle.title}>
                                    People
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onHangoutsPress}
                                style={HomeScreenStyle.hangoutsContainer}
                            >
                                <Text style={HomeScreenStyle.number}>32</Text>
                                <Text style={HomeScreenStyle.title}>
                                    Hangouts
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={HomeScreenStyle.iconContainer}>
                            <IconButton
                                icon={IconEnum.BELL}
                                onPress={onNotificationsPress}
                                size={25}
                                style={HomeScreenStyle.bellIcon}
                            />
                            <IconButton
                                icon={IconEnum.CHAT_FILLED}
                                onPress={onMessagesPress}
                                size={26}
                            />
                        </View>
                    </View>
                </View>
                <View style={HomeScreenStyle.comingsUpContainer}>
                    <Text style={HomeScreenStyle.comingsUpTitle}>
                        Comings up
                    </Text>
                    <SectionList />
                </View>
            </View>
        </SafeAreaView>
    );
};
