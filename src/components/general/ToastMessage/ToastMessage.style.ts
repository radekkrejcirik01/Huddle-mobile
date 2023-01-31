import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToastMessageStyle = StyleSheet.create({
    touchableOpacity: {
        height: 60,
        paddingLeft: 15,
        justifyContent: 'center',
        width: '95%',
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: COLORS.GRAY_100
    },
    title: {
        color: COLORS.WHITE,
        fontSize: 15,
        fontWeight: '500'
    },
    body: {
        color: COLORS.WHITE,
        fontSize: 12,
        fontWeight: '500'
    }
});
