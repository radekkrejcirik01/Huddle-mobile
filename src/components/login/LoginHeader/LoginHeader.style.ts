import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LoginHeaderStyle = StyleSheet.create({
    view: {
        marginTop: 15,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 22,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
