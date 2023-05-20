import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CommentLikesListItemStyle = StyleSheet.create({
    view: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    nameText: {
        marginLeft: 10,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
