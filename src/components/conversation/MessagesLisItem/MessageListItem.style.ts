import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageListItemStyle = StyleSheet.create({
    paddingTop: {
        paddingTop: 15,
        marginBottom: 2
    },
    marginBottom: {
        marginBottom: 2
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
    imageView: {
        paddingTop: 4,
        paddingHorizontal: 4,
        paddingBottom: 0,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    image: {
        width: 225,
        height: 250,
        borderRadius: 10
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
    imageRow: {
        padding: 4
    },
    sentIcon: {
        marginLeft: 4
    },
    reactionsView: {
        marginHorizontal: 2,
        flexDirection: 'row'
    },
    reactionText: {
        marginLeft: 2
    }
});
