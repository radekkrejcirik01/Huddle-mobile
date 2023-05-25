import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { FriendsTabHeaderStyle } from '@components/friends/FriendsTabHeader/FriendsTabHeader.style';
import { IconButton } from '@components/general/IconButton/IconButton';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { AddFriend } from '@components/friends/AddFriend/AddFriend';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const FriendsTabHeader = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={[FriendsTabHeaderStyle.header, { paddingTop: top + 5 }]}>
            <IconButton
                icon={IconEnum.PROFILE}
                size={22}
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.InvitesScreen)
                }
            />
            <Text style={FriendsTabHeaderStyle.title}>👨‍👩‍👧‍👦</Text>
            <AddFriend />
        </View>
    );
};
