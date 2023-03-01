import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BadgeStyle = StyleSheet.create({
    view: {
        minHeight: 15,
        minWidth: 15,
        top: -5,
        right: -5,
        paddingHorizontal: 2,
        borderRadius: 10,
        backgroundColor: COLORS.RED,
        position: 'absolute',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
