import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToastMessageStyle = StyleSheet.create({
    touchableOpacity: {
        top: 10,
        width: '95%',
        padding: 15,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: COLORS.BLACK_200,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    body: {
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
