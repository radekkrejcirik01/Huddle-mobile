import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddFriendsStyle = StyleSheet.create({
    view: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addView: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    addText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    letterSpacing: {
        letterSpacing: -8
    },
    invitesView: {
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    modalContainer: {
        flex: 1,
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.BLACK,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    inputContainer: {
        width: '100%'
    },
    title: {
        fontSize: 30,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    inputView: {
        height: 65,
        marginTop: 20,
        paddingHorizontal: 15,
        borderRadius: 35,
        backgroundColor: COLORS.GRAY_100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    at: {
        paddingLeft: 10,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    input: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    flex: {
        flex: 1
    },
    sendButton: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center'
    },
    sendButtonText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
