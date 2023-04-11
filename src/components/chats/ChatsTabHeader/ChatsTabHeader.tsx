import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/general/SafeAreaView/SafeAreaView';
import { ChatsTabHeaderStyle } from '@components/chats/ChatsTabHeader/ChatsTabHeader.style';

export const ChatsTabHeader = (): JSX.Element => (
    <SafeAreaView>
        <View style={ChatsTabHeaderStyle.header}>
            <Text style={ChatsTabHeaderStyle.content}>Chats</Text>
        </View>
    </SafeAreaView>
);
