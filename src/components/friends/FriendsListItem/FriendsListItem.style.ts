import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsListItemStyle = StyleSheet.create({
    view: {
        marginHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BLACK_300,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        marginLeft: 10,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
