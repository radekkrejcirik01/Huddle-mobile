import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesItemStyle = StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: COLORS.BLACK,
        alignItems: 'flex-start'
    },
    row: {
        flexDirection: 'row'
    },
    image: {
        height: 55,
        width: 55,
        borderRadius: 50,
        backgroundColor: COLORS.GRAY_100
    },
    box: {
        flex: 1,
        paddingBottom: 25,
        paddingHorizontal: 10
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        maxWidth: '65%',
        paddingBottom: 5,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 12,
        fontWeight: 'bold'
    }
});
