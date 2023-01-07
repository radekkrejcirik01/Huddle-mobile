import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProfileScreenStyle } from '@screens/profile/ProfileScreen/ProfileScreen.style';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';
import { ProfileStackNavigatorEnum } from '@navigation/StackNavigators/profile/ProfileStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';

export const ProfileScreen = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.MessagesStack);

    const onProfileSettingsPress = useCallback(() => {
        navigateTo(ProfileStackNavigatorEnum.SettingsScreen);
    }, [navigateTo]);

    const onPeoplePress = useCallback(() => {
        navigateTo(ProfileStackNavigatorEnum.PeopleScreen);
    }, [navigateTo]);

    const onHangoutsPress = useCallback(() => {
        navigateTo(ProfileStackNavigatorEnum.HangoutsScreen);
    }, [navigateTo]);

    const onNotificationsPress = useCallback(() => {
        navigateTo(ProfileStackNavigatorEnum.NotificationsScreen);
    }, [navigateTo]);

    const onMessagesPress = useCallback(() => {
        navigateTo(ProfileStackNavigatorEnum.MessagesScreen);
    }, [navigateTo]);

    return (
        <SafeAreaView style={ProfileScreenStyle.safeArea}>
            <View style={ProfileScreenStyle.container}>
                <ScrollView>
                    <View style={ProfileScreenStyle.header}>
                        <TouchableOpacity onPress={onProfileSettingsPress}>
                            <FastImage
                                source={require('../../../assets/images/profilovka.png')}
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
                                        0
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
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
