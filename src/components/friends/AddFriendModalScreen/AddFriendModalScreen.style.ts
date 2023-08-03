import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddFriendModalScreenStyle = StyleSheet.create({
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
        height: 55,
        marginTop: 20,
        paddingHorizontal: 15,
        borderRadius: 35,
        backgroundColor: COLORS.GRAY_100,
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 26,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    sendButtonText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
