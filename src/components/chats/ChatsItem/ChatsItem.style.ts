import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsItemStyle = StyleSheet.create({
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
    titleRow: {
        maxWidth: '65%',
        paddingBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    titleImage: {
        height: 15,
        width: 15,
        borderRadius: 10
    },
    titleText: {
        marginLeft: 2,
        color: COLORS.WHITE,
        fontWeight: '500'
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