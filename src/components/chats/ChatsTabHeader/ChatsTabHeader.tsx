import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatsTabHeaderStyle } from '@components/chats/ChatsTabHeader/ChatsTabHeader.style';

export const ChatsTabHeader = (): JSX.Element => {
    const { top } = useSafeAreaInsets();
    return (
        <View style={[ChatsTabHeaderStyle.header, { paddingTop: top + 5 }]}>
            <Text style={ChatsTabHeaderStyle.title}>💬</Text>
        </View>
    );
};
