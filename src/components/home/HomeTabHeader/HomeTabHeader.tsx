import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ReducerProps } from '@store/index/index.props';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { HomeTabHeaderStyle } from '@components/home/HomeTabHeader/HomeTabHeader.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Badge } from '@components/general/Badge/Badge';

export const HomeTabHeader = (): JSX.Element => {
    const { notifications, user } = useSelector(
        (state: ReducerProps) => state.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openProfile = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.ProfileScreen),
        [navigateTo]
    );

    const openNotifications = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.NotificationsScreen),
        [navigateTo]
    );

    return (
        <SafeAreaView style={HomeTabHeaderStyle.container}>
            <View style={HomeTabHeaderStyle.topView}>
                <View style={HomeTabHeaderStyle.flex} />
                <TouchableOpacity onPress={openProfile}>
                    <Text style={HomeTabHeaderStyle.usernameText}>
                        {user?.username}
                    </Text>
                </TouchableOpacity>
                <View style={HomeTabHeaderStyle.bellIconContainer}>
                    <TouchableOpacity onPress={openNotifications}>
                        <Icon name={IconEnum.BELL} size={25} />
                        <Badge value={notifications} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={openProfile}>
                <FastImage
                    source={{
                        uri: user?.profilePhoto
                    }}
                    style={HomeTabHeaderStyle.image}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};
