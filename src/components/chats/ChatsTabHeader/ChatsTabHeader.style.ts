import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsTabHeaderStyle = StyleSheet.create({
    header: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    createView: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    createText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
