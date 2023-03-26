import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    comingsUpContainer: {
        flex: 1,
        paddingTop: 20
    },
    comingsUpTitle: {
        marginBottom: 10,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
