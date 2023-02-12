import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const TypingIndicatorStyle = StyleSheet.create({
    chatTypeView: {
        height: 20,
        paddingLeft: 10
    },
    chatTypeText: {
        color: COLORS.WHITE,
        fontStyle: 'italic'
    },
    messageTypeText: {
        fontSize: 12,
        color: COLORS.LIGHTGRAY_300,
        fontWeight: '600',
        fontStyle: 'italic'
    }
});
