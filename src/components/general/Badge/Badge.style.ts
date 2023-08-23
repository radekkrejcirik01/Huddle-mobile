import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BadgeStyle = StyleSheet.create({
    view: {
        top: -5,
        left: 15,
        paddingTop: 1,
        paddingHorizontal: 5,
        paddingBottom: 2,
        borderRadius: 10,
        backgroundColor: COLORS.RED,
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    text: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
