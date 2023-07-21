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
    createAccountView: {
        marginTop: 100,
        marginHorizontal: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    createAccountText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600',
        alignSelf: 'center'
    }
});
