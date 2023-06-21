import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsListItemStyle = StyleSheet.create({
    view: {
        marginHorizontal: 12,
        paddingTop: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BLACK_300,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        marginLeft: 10,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 25
    }
});
