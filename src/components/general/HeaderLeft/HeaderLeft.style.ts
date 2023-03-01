import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HeaderLeftStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        padding: 2,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
