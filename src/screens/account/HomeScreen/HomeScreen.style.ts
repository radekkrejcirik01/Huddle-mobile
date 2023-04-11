import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    comingsUpContainer: {
        flex: 1, // to enable full screen scroll
        paddingTop: 20
    },
    comingsUpTitle: {
        marginBottom: 10,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
