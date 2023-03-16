import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToastMessageStyle = StyleSheet.create({
    touchableOpacity: {
        width: '95%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: COLORS.MAIN_WHITE,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: 15,
        color: COLORS.GRAY_100,
        fontWeight: '600'
    },
    body: {
        fontSize: 12,
        color: COLORS.GRAY_100,
        fontWeight: '600'
    }
});
