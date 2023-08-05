import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CommentLikeItemStyle = StyleSheet.create({
    view: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 10,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
