import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatListStyle = StyleSheet.create({
    contentContainer: {
        paddingTop: 40,
        paddingHorizontal: 12,
        paddingBottom: 20
    },
    container: {
        marginTop: -25, // to match input's layout with chat list items
        marginHorizontal: 10,
        marginBottom: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.BLACK_200,
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
