import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToastMessageStyle = StyleSheet.create({
    touchableOpacity: {
        padding: 15,
        justifyContent: 'center',
        width: '95%',
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: COLORS.MAIN_BLUE
    },
    title: {
        color: COLORS.WHITE,
        fontSize: 15,
        fontWeight: '600'
    },
    body: {
        color: COLORS.WHITE,
        fontSize: 12,
        fontWeight: '600'
    }
});
