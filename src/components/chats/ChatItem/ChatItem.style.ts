import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatItemStyle = StyleSheet.create({
    container: {
        paddingBottom: 5,
        borderBottomWidth: 0.5,
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
        width: 10,
        height: 10,
        marginRight: 5,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    nameText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    sentIcon: {
        top: -2, // fit the layout
        left: 4
    },
    timeText: {
        maxWidth: '65%',
        color: COLORS.LIGHTGRAY_300
    },
    messageText: {
        color: COLORS.LIGHTGRAY_300
    },
    newMessageText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    newHuddlesView: {
        marginLeft: 6,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: COLORS.PASTEL_PURPLE,
        alignItems: 'center'
    },
    newHuddlesText: {
        fontSize: 11,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
