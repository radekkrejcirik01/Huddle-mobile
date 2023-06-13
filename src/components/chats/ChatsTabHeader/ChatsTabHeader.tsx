import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { ChatsTabHeaderStyle } from '@components/chats/ChatsTabHeader/ChatsTabHeader.style';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const ChatsTabHeader = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={ChatsTabHeaderStyle.header}>
            <Text style={ChatsTabHeaderStyle.title}>Chats</Text>
            <Text style={ChatsTabHeaderStyle.title}>💬</Text>
            <TouchableOpacity
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.FriendsScreen)
                }
                style={ChatsTabHeaderStyle.createView}
            >
                <Text style={ChatsTabHeaderStyle.createText}>New</Text>
            </TouchableOpacity>
        </View>
    );
};
