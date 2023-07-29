import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsListItemStyle = StyleSheet.create({
    view: {
        marginHorizontal: 12,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.BLACK_300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        marginLeft: 10,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    chatEmoji: {
        marginRight: 10,
        fontSize: 16
    }
});
