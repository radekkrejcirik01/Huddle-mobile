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
    title: {
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
