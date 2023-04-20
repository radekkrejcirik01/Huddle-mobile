import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
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
    const { huddles, notifications, people, user } = useSelector(
        (state: ReducerProps) => state.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openProfile = useCallback(() => {
        navigateTo(AccountStackNavigatorEnum.ProfileScreen);
    }, [navigateTo]);

    const peopleNumber = useMemo((): number => people, [people]);
    const huddlesNumber = useMemo((): number => huddles, [huddles]);

    const openPeople = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.PeopleScreen),
        [navigateTo]
    );

    const openHangouts = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.HuddlesHistoryScreen),
        [navigateTo]
    );

    const openNotifications = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.NotificationsScreen),
        [navigateTo]
    );

    return (
        <SafeAreaView style={HomeTabHeaderStyle.container}>
            <TouchableOpacity onPress={openProfile}>
                <FastImage
                    source={{
                        uri: user?.profilePhoto
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
                        <Text style={HomeTabHeaderStyle.title}>People</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openHangouts}
                        style={HomeTabHeaderStyle.huddlesContainer}
                    >
                        <Text style={HomeTabHeaderStyle.number}>
                            {huddlesNumber}
                        </Text>
                        <Text style={HomeTabHeaderStyle.title}>Huddles</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={openNotifications}>
                    <Icon name={IconEnum.BELL} size={25} />
                    <Badge value={notifications} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
