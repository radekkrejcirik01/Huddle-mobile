import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import SHADOW from '@constants/SHADOW';

export const MessageListItemStyle = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: 5
    },
    outboundView: {
        alignItems: 'flex-end'
    },
    messageView: {
        ...SHADOW.CHAT_ITEM,
        maxWidth: '75%',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 18
    },
    inboundMessageColor: {
        backgroundColor: COLORS.BLACK
    },
    outboundMessageColor: {
        backgroundColor: COLORS.MAIN_BLUE
    },
    imageView: {
        padding: 0,
        paddingHorizontal: 0
    },
    image: {
        width: 175,
        height: 175,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    messageText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    timeText: {
        margin: 2,
        fontSize: 11,
        color: COLORS.WHITE
    }
});
