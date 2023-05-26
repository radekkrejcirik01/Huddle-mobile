import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { FriendsTabHeaderStyle } from '@components/friends/FriendsTabHeader/FriendsTabHeader.style';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { AddFriend } from '@components/friends/AddFriend/AddFriend';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { Badge } from '@components/general/Badge/Badge';
import { Icon } from '@components/general/Icon/Icon';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { FriendsTabHeaderProps } from '@components/friends/FriendsTabHeader/FriendsTabHeader.props';

export const FriendsTabHeader = ({
    invitesNumber
}: FriendsTabHeaderProps): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={[FriendsTabHeaderStyle.header, { paddingTop: top + 5 }]}>
            <TouchableOpacity
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.InvitesScreen)
                }
                style={FriendsTabHeaderStyle.invitesView}
            >
                <Icon name={IconEnum.PROFILE} size={22} />
                <Badge value={invitesNumber} />
            </TouchableOpacity>
            <View style={FriendsTabHeaderStyle.titleView}>
                <Text style={FriendsTabHeaderStyle.title}>👨‍👩‍👧‍👦</Text>
            </View>
            <View style={FriendsTabHeaderStyle.addFriendView}>
                <AddFriend />
            </View>
        </View>
    );
};
