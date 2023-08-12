import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageItemStyle = StyleSheet.create({
    container: {
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    flexEnd: {
        alignSelf: 'flex-end'
    },
    space: {
        paddingTop: 8,
        marginBottom: 2
    },
    marginRight: {
        marginRight: 5
    },
    width: {
        width: 40
    },
    row: {
        flexDirection: 'row'
    },
    paddingBottom: {
        paddingBottom: 5
    },
    justifyContent: {
        justifyContent: 'space-between'
    },
    messageView: {
        maxWidth: '75%',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: COLORS.BLACK_200,
        alignSelf: 'flex-start',
        alignItems: 'flex-end'
    },
    outbound: {
        backgroundColor: COLORS.MESSAGE_BLUE
    },
    replyPhoto: {
        height: 55,
        width: 55,
        marginRight: 5,
        borderRadius: 4,
        opacity: 0.9
    },
    replyMessageText: {
        paddingTop: 2,
        fontSize: 15,
        opacity: 0.8,
        color: COLORS.WHITE
    },
    messageText: {
        fontSize: 16,
        color: COLORS.WHITE
    },
    imageView: {
        width: '50%',
        height: 250
    },
    image: {
        flex: 1,
        borderRadius: 20
    }
});
