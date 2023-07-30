import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ChatsTabIconStyle } from '@components/chats/ChatsTabIcon/ChatsTabIcon.style';

export const ChatsTabIcon = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <TouchableOpacity
            onPress={() => navigateTo(AccountStackNavigatorEnum.FriendsScreen)}
        >
            <Text style={ChatsTabIconStyle.text}>💬</Text>
        </TouchableOpacity>
    );
};
