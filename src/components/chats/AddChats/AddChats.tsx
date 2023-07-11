import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { AddChatsStyle } from '@components/chats/AddChats/AddChats.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const AddChats = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <TouchableOpacity
            onPress={() => navigateTo(AccountStackNavigatorEnum.FriendsScreen)}
            style={AddChatsStyle.view}
        >
            <Text style={AddChatsStyle.createText}>Start 💬</Text>
        </TouchableOpacity>
    );
};
