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
        height: 50,
        padding: 10,
        backgroundColor: COLORS.BLACK_300,
        flexDirection: 'row'
    },
    replyMessageText: {
        paddingRight: 10,
        color: COLORS.LIGHTGRAY
    },
    replyPhoto: {
        height: 50,
        width: 50,
        opacity: 0.7
    }
});
