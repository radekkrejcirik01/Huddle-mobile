import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InputStyle = StyleSheet.create({
    container: {
        height: 45,
        paddingHorizontal: 15,
        borderRadius: 10,
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
