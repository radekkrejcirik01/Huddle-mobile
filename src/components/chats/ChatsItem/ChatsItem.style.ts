import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsItemStyle = StyleSheet.create({
    container: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BLACK_300,
        alignItems: 'flex-start'
    },
    row: {
        flexDirection: 'row'
    },
    box: {
        flex: 1,
        paddingHorizontal: 10
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dot: {
        width: 12,
        height: 12,
        left: 5,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    name: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    sentIcon: {
        top: -2, // fit the layout
        left: 4
    },
    time: {
        maxWidth: '65%',
        color: COLORS.WHITE
    },
    message: {
        fontWeight: '500'
    }
});
