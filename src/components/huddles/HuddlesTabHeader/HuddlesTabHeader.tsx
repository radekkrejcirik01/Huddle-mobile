import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { HuddlesTabHeaderStyle } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.style';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { Icon } from '@components/general/Icon/Icon';
import { Badge } from '@components/general/Badge/Badge';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ReducerProps } from '@store/index/index.props';

export const HuddlesTabHeader = (): JSX.Element => {
    const { notificationsNumber } = useSelector(
        (state: ReducerProps) => state.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { top } = useSafeAreaInsets();

    const openNotifications = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.NotificationsScreen),
        [navigateTo]
    );

    return (
        <View
            style={[HuddlesTabHeaderStyle.container, { paddingTop: top + 5 }]}
        >
            <View style={HuddlesTabHeaderStyle.header}>
                <Text style={HuddlesTabHeaderStyle.content}>Huddles 👋</Text>
                <TouchableOpacity onPress={openNotifications}>
                    <Icon name={IconEnum.BELL} size={25} />
                    <Badge value={notificationsNumber} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
