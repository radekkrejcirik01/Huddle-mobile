import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LoginScreenStyle = StyleSheet.create({
    inputsContainer: {
        marginTop: '60%',
        paddingHorizontal: 40
    },
    inputView: {
        marginTop: 15
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
