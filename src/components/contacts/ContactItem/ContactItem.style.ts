import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ContactItemStyle = StyleSheet.create({
    view: {
        marginHorizontal: 12,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.BLACK_300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    username: {
        opacity: 0.8,
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    chatEmoji: {
        fontSize: 16
    },
    acceptView: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center'
    },
    acceptText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
