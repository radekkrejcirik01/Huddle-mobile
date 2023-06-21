import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageListItemStyle = StyleSheet.create({
    paddingTop: {
        paddingTop: 15
    },
    view: {
        maxWidth: '75%',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: COLORS.BLACK_200,
        alignSelf: 'flex-start',
        alignItems: 'flex-end'
    },
    flexEnd: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.MESSAGE_BLUE
    },
    longMessage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageText: {
        fontSize: 15,
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
        marginLeft: 2
    }
});
