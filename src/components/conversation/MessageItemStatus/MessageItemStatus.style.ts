import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageItemStatusStyle = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    timeText: {
        marginLeft: 8,
        fontSize: 12,
        opacity: 0.8,
        color: COLORS.WHITE,
        fontWeight: '500'
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
    }
});
