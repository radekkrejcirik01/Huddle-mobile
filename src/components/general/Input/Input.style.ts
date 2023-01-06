import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InputStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        borderRadius: 30,
        height: 45,
        borderWidth: 2,
        borderColor: COLORS.WHITE,
        flexDirection: 'row'
    },
    centerItems: {
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
