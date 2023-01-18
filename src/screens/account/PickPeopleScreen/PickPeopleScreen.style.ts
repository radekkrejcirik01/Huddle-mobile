import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HangoutPickerStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    inputView: {
        height: 40,
        marginTop: 15,
        borderWidth: 0,
        backgroundColor: COLORS.GRAY_100
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        color: COLORS.GRAY_800,
        fontWeight: '500'
    },
    flashListView: {
        width: '100%',
        height: '100%',
        marginTop: 10
    }
});
