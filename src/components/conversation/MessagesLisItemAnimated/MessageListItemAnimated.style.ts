import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageListItemAnimatedStyle = StyleSheet.create({
    paddingTop: {
        paddingTop: 15
    },
    marginBottom: {
        marginBottom: 2
    },
    view: {
        maxWidth: '75%',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: COLORS.BLACK_300,
        alignSelf: 'flex-start',
        alignItems: 'flex-end'
    },
    flexEnd: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.PASTEL_RED
    },
    longMessage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageText: {
        fontSize: 16,
        color: COLORS.WHITE
    },
    timeText: {
        marginLeft: 8,
        fontSize: 12,
        opacity: 0.8,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    reactionsView: {
        marginHorizontal: 2,
        flexDirection: 'row'
    },
    sentIcon: {
        marginLeft: 4
    },
    reactionText: {
        fontSize: 15,
        marginLeft: 2
    }
});
