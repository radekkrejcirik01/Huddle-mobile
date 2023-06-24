import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShowHuddlesScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    title: {
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    listContentContainer: {
        paddingTop: 20
    }
});
