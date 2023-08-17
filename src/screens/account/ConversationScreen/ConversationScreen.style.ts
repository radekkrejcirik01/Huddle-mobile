import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationScreenStyle = StyleSheet.create({
    headerStyle: {
        backgroundColor: COLORS.BLACK_300,
        shadowOpacity: 0
    },
    headerHeight: {
        height: 110
    },
    container: {
        paddingTop: 2,
        backgroundColor: COLORS.BLACK_300
    },
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.BLACK
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 60
    },
    replyView: {
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 25,
        backgroundColor: COLORS.BLACK_300,
        flexDirection: 'row'
    },
    replyPhoto: {
        height: 55,
        width: 55,
        borderRadius: 10,
        opacity: 0.9
    },
    replyMessageText: {
        marginLeft: 10,
        opacity: 0.9,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    huddleLikesModal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
