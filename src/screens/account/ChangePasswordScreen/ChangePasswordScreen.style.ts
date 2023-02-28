import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChangePasswordScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    title: {
        paddingBottom: 10,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    marginTop: {
        marginTop: 25
    },
    keyboardAvoiding: {
        flex: 1,
        justifyContent: 'center'
    },
    confirm: {
        fontSize: 17,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: '600'
    }
});
