import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToastMessageStyle = StyleSheet.create({
    touchableOpacity: {
        top: 10,
        width: '95%',
        padding: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: COLORS.PASTEL_PURPLE,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    body: {
        marginTop: 2,
        opacity: 0.9,
        color: COLORS.WHITE
    }
});
