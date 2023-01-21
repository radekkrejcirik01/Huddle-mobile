import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { IconEnum } from '@components/icon/Icon.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SectionList } from '@components/general/SectionList/SectionList';
import { ReducerProps } from '@store/index/index.props';
import { Badge } from '@components/general/Badge/Badge';
import { Icon } from '@components/icon/Icon';

export const HomeScreen = (): JSX.Element => {
    const { hangouts, notifications, people, unreadMessages } = useSelector(
        (state: ReducerProps) => state.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const onProfileSettingsPress = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ProfileScreen);
    }, [navigateTo]);

    const peopleNumber = useMemo((): number => people, [people]);
    const hangoutsNumber = useMemo((): number => hangouts, [hangouts]);

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
                                <Text style={HomeScreenStyle.number}>
                                    {peopleNumber}
                                </Text>
                                <Text style={HomeScreenStyle.title}>
                                    People
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onHangoutsPress}
                                style={HomeScreenStyle.hangoutsContainer}
                            >
                                <Text style={HomeScreenStyle.number}>
                                    {hangoutsNumber}
                                </Text>
                                <Text style={HomeScreenStyle.title}>
                                    Hangouts
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={HomeScreenStyle.iconContainer}>
                            <TouchableOpacity
                                onPress={onNotificationsPress}
                                style={HomeScreenStyle.bellIcon}
                            >
                                <Icon name={IconEnum.BELL} size={25} />
                                <Badge value={notifications} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onMessagesPress}>
                                <Icon name={IconEnum.CHAT_FILLED} size={26} />
                                <Badge value={unreadMessages} />
                            </TouchableOpacity>
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
