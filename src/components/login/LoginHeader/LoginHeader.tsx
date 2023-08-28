import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginHeaderStyle } from '@components/login/LoginHeader/LoginHeader.style';
import COLORS from '@constants/COLORS';

export const LoginHeader = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[LoginHeaderStyle.view, { top }]}>
            <Text style={LoginHeaderStyle.titleText}>
                <Text style={{ color: COLORS.PASTEL_ORANGE }}>S</Text>
                <Text style={{ color: COLORS.PASTEL_RED }}>e</Text>
                <Text style={{ color: COLORS.PASTEL_PURPLE }}>n</Text>
                <Text style={{ color: COLORS.PASTEL_BLUE }}>d</Text>
                <Text style={{ color: COLORS.BUTTON_BLUE }}>e</Text>
                <Text style={{ color: COLORS.BUTTON_BLUE }}>r</Text>
            </Text>
        </View>
    );
};
