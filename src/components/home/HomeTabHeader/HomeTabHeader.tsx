import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { HomeTabHeaderStyle } from '@components/home/HomeTabHeader/HomeTabHeader.style';

export const HomeTabHeader = (): JSX.Element => {
    const { hangouts, notifications, people, user } = useSelector(
        (state: ReducerProps) => state.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openProfile = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ProfileScreen);
    }, [navigateTo]);

    const peopleNumber = useMemo((): number => people, [people]);
    const hangoutsNumber = useMemo((): number => hangouts, [hangouts]);

    const openPeople = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.FriendsScreen);
    }, [navigateTo]);

    const openHangouts = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.HangoutsHistoryScreen);
    }, [navigateTo]);

    const openNotifications = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.NotificationsScreen);
    }, [navigateTo]);

    return (
        <View style={HomeTabHeaderStyle.header}>
            <TouchableOpacity onPress={openProfile}>
                <FastImage
                    source={{
                        uri: user?.profilePicture
                    }}
                    style={HomeTabHeaderStyle.image}
                />
            </TouchableOpacity>
            <View style={HomeTabHeaderStyle.buttonsContainer}>
                <View style={HomeTabHeaderStyle.numbersContainer}>
                    <TouchableOpacity onPress={openPeople}>
                        <Text style={HomeTabHeaderStyle.number}>
                            {peopleNumber}
                        </Text>
                        <Text style={HomeTabHeaderStyle.title}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openHangouts}
                        style={HomeTabHeaderStyle.hangoutsContainer}
                    >
                        <Text style={HomeTabHeaderStyle.number}>
                            {hangoutsNumber}
                        </Text>
                        <Text style={HomeTabHeaderStyle.title}>Hangouts</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={openNotifications}
                    style={HomeTabHeaderStyle.bellIcon}
                >
                    <Icon name={IconEnum.BELL} size={25} />
                    <Badge value={notifications} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
