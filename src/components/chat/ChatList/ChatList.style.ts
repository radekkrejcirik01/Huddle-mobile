import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatListStyle = StyleSheet.create({
    contentContainer: {
        paddingTop: 40,
        paddingHorizontal: 12,
        paddingBottom: 20
    },
    bottomContainer: {
        marginHorizontal: 10,
        flexDirection: 'row'
    },
    iconsButtonsView: {
        paddingBottom: 6,
        flexDirection: 'row'
    },
    photoIcon: {
        marginBottom: -2, // The icon is not properly sized
        justifyContent: 'flex-end'
    },
    iconButton: {
        marginRight: 12,
        justifyContent: 'flex-end'
    },
    inputContainer: {
        flex: 1,
        marginBottom: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.BLACK_200,
        backgroundColor: COLORS.BLACK,
        flexDirection: 'row'
    },
    input: {
        margin: 2,
        padding: 5,
        paddingRight: 15,
        flex: 1,
        fontSize: 15,
        color: COLORS.WHITE
    },
    sendView: {
        paddingBottom: 6,
        justifyContent: 'flex-end'
    },
    send: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '700'
    }
});
