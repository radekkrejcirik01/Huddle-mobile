import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleLikesModalStyle = StyleSheet.create({
    view: {
        height: '45%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.BLACK_300
    },
    title: {
        padding: 20,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600',
        textAlign: 'center'
    },
    listContainer: {
        flexGrow: 1
    }
});
