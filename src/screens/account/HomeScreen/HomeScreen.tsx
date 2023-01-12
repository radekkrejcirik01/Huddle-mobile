import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/icon/Icon.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { SectionList } from '@components/general/SectionList/SectionList';
import { ReducerProps } from '@store/index/index.props';

export const HomeScreen = (): JSX.Element => {
    const { hangouts, people } = useSelector(
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
