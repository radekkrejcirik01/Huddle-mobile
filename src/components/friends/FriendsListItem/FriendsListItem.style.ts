import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsListItemStyle = StyleSheet.create({
    view: {
        marginHorizontal: 12,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.BLACK_200,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 25
    }
});
