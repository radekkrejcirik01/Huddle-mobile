import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatInputStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 15
    },
    inputContainer: {
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.BLACK_200,
        backgroundColor: COLORS.BLACK,
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
