import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginHeaderStyle } from '@components/login/LoginHeader/LoginHeader.style';

export const LoginHeader = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[LoginHeaderStyle.view, { top }]}>
            <Text style={LoginHeaderStyle.titleText}>Sender 👋</Text>
        </View>
    );
};
