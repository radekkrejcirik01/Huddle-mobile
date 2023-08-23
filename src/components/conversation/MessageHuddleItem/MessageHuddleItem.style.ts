import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageHuddleItemStyle = StyleSheet.create({
    huddleView: {
        paddingHorizontal: '4%',
        marginBottom: 12,
        alignItems: 'center'
    },
    marginTop: {
        marginTop: 10
    },
    huddleTitleView: {
        marginBottom: 4,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: COLORS.PASTEL_PURPLE
    },
    huddleTitleText: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
