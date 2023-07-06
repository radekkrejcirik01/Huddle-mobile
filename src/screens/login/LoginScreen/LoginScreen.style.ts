import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LoginScreenStyle = StyleSheet.create({
    inputsContainer: {
        marginTop: '60%',
        paddingHorizontal: 40
    },
    usernameInputView: {
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_200
    },
    passwordInputView: {
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_200
    },
    loginButtonView: {
        marginTop: '20%',
        alignSelf: 'center'
    },
    loginButtonText: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontWeight: 'bold'
    },
    registerButtonView: {
        marginTop: 100,
        alignSelf: 'center'
    },
    registerButtonText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: '600'
    }
});
