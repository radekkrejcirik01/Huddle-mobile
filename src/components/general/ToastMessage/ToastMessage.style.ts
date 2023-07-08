import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToastMessageStyle = StyleSheet.create({
    touchableOpacity: {
        top: 10,
        width: '95%',
        padding: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: COLORS.GRAY_400,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    body: {
        marginTop: 2,
        color: COLORS.WHITE
    }
});
