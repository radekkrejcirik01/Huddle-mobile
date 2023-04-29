import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { HuddlesTabHeaderStyle } from '@components/huddles/HuddlesTabHeader/HuddlesTabHeader.style';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { Icon } from '@components/general/Icon/Icon';
import { Badge } from '@components/general/Badge/Badge';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { ReducerProps } from '@store/index/index.props';

export const HuddlesTabHeader = (): JSX.Element => {
    const { notifications, people } = useSelector(
        (state: ReducerProps) => state.user
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const openNotifications = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.NotificationsScreen),
        [navigateTo]
    );

    const openPeople = useCallback(
        () => navigateTo(AccountStackNavigatorEnum.PeopleScreen),
        [navigateTo]
    );

    return (
        <SafeAreaView>
            <View style={HuddlesTabHeaderStyle.header}>
                <Text style={HuddlesTabHeaderStyle.content}>Huddles</Text>
                <View style={HuddlesTabHeaderStyle.row}>
                    <TouchableOpacity
                        onPress={openNotifications}
                        style={HuddlesTabHeaderStyle.iconButton}
                    >
                        <Icon name={IconEnum.BELL} size={25} />
                        <Badge value={notifications} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openPeople}
                        style={HuddlesTabHeaderStyle.peopleView}
                    >
                        <Text style={HuddlesTabHeaderStyle.peopleText}>
                            People
                        </Text>
                        <Text style={HuddlesTabHeaderStyle.peopleNumber}>
                            {people}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
