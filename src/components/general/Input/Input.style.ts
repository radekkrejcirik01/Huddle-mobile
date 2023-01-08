import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InputStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        borderRadius: 10,
        height: 45,
        backgroundColor: COLORS.GRAY_100,
        flexDirection: 'row'
    },
    centerItems: {
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
