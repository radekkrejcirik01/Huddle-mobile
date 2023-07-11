import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LikesModalContentStyle = StyleSheet.create({
    view: {
        height: '45%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.BLACK_300
    },
    title: {
        padding: 20,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    listContainer: {
        flexGrow: 1
    }
});
