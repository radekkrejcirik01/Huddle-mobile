import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageListItemStyle = StyleSheet.create({
    paddingTop: {
        paddingTop: 15
    },
    view: {
        maxWidth: '75%',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 6,
        borderRadius: 18,
        backgroundColor: COLORS.BLACK_200,
        alignSelf: 'flex-start'
    },
    flexEnd: {
        alignSelf: 'flex-end'
    },
    messageText: {
        marginBottom: 4,
        fontSize: 15,
        color: COLORS.WHITE
    },
    timeText: {
        fontSize: 11,
        opacity: 0.7,
        color: COLORS.WHITE,
        alignSelf: 'flex-end'
    }
});
