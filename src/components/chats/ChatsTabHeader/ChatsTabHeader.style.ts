import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsTabHeaderStyle = StyleSheet.create({
    header: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
