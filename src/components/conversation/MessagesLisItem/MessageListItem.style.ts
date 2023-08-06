import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageListItemStyle = StyleSheet.create({
    container: {
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    paddingTop: {
        paddingTop: 8,
        marginBottom: 2
    },
    marginTop: {
        marginTop: 10
    },
    marginRight: {
        marginRight: 5
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
    blueBackground: {
        backgroundColor: COLORS.MESSAGE_BLUE
    },
    flexEnd: {
        alignSelf: 'flex-end'
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
        fontSize: 15,
        marginLeft: 2
    },
    huddleView: {
        paddingHorizontal: '4%',
        marginBottom: 12,
        alignItems: 'center'
    },
    huddleTitleView: {
        marginBottom: 4,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: COLORS.PASTEL_PURPLE
    },
    huddleTitleText: {
        fontSize: 11,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
