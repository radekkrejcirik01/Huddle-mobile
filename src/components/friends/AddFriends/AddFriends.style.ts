import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddFriendsStyle = StyleSheet.create({
    view: {
        marginLeft: 20,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addView: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    addText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    letterSpacing: {
        letterSpacing: -8
    },
    invitesView: {
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'flex-start'
    }
});
