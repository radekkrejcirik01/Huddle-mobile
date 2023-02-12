import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const TypingIndicatorStyle = StyleSheet.create({
    view: {
        height: 20,
        paddingLeft: 10
    },
    text: {
        color: COLORS.WHITE,
        fontStyle: 'italic'
    }
});
