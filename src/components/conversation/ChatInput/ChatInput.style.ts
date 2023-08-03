import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatInputStyle = StyleSheet.create({
    container: {
        paddingTop: 5,
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
        fontSize: 16,
        color: COLORS.WHITE
    },
    sendView: {
        justifyContent: 'center'
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
