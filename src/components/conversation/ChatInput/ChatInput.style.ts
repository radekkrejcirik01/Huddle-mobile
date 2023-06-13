import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatInputStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 4,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 25,
        backgroundColor: COLORS.BLACK_300,
        flexDirection: 'row'
    },
    galleryIcon: {
        marginLeft: 5,
        marginRight: 25,
        opacity: 0.8
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
    sendOpacity: {
        opacity: 0.6
    },
    sendText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '700'
    }
});
