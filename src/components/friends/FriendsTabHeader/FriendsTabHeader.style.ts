import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsTabHeaderStyle = StyleSheet.create({
    header: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    invitesView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    titleView: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    addFriendView: {
        flex: 1,
        alignItems: 'flex-end'
    }
});
