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
                <Text style={{ color: COLORS.PASTEL_ORANGE }}>K</Text>
                <Text style={{ color: COLORS.PASTEL_RED }}>o</Text>
                <Text style={{ color: COLORS.PASTEL_PURPLE }}>a</Text>
                <Text style={{ color: COLORS.PASTEL_BLUE }}>l</Text>
                <Text style={{ color: COLORS.BUTTON_BLUE }}>a</Text>{' '}
                <Text style={{ color: COLORS.BUTTON_BLUE }}>M</Text>
                <Text style={{ color: COLORS.PASTEL_BLUE }}>e</Text>
                <Text style={{ color: COLORS.PASTEL_PURPLE }}>s</Text>
                <Text style={{ color: COLORS.PASTEL_RED }}>s</Text>
                <Text style={{ color: COLORS.PASTEL_ORANGE }}>e</Text>
                <Text style={{ color: COLORS.PASTEL_BLUE }}>n</Text>
                <Text style={{ color: COLORS.BUTTON_BLUE }}>g</Text>
                <Text style={{ color: COLORS.PASTEL_PURPLE }}>e</Text>
                <Text style={{ color: COLORS.PASTEL_RED }}>r</Text> 🐨
            </Text>
        </View>
    );
};
