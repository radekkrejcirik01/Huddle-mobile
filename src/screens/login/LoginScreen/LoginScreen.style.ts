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
        paddingHorizontal: 50,
        alignItems: 'center'
    },
    happyInfoText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    createAccountText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.BUTTON_BLUE,
        fontWeight: '600'
    }
});
