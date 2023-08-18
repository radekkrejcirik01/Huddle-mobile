import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CommentInputStyle = StyleSheet.create({
    mentionListContainer: {
        height: 110,
        paddingTop: 5,
        paddingHorizontal: 20,
        backgroundColor: COLORS.BLACK_300
    },
    mentionItemView: {
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    mentionItemText: {
        marginLeft: 5,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    bottomContainer: {
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: COLORS.BLACK
    },
    inputView: {
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
    mentionText: {
        padding: 4,
        borderRadius: 12,
        color: COLORS.WHITE,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center',
        overflow: 'hidden'
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
    send: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '700'
    }
});
