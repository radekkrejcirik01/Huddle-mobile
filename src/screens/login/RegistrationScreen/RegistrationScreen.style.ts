import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RegistrationScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    inputsContainer: {
        paddingTop: '15%',
        paddingHorizontal: 20
    },
    usernameIconLeft: {
        fontSize: 16,
        color: COLORS.GRAY_800,
        fontWeight: 'bold'
    },
    colorWhite: {
        color: COLORS.WHITE
    },
    inputView: {
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_200
    },
    inputMarginTop: {
        marginTop: 20
    },
    button: {
        marginTop: 50,
        marginHorizontal: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    privacyText: {
        marginHorizontal: 30,
        marginTop: 20,
        fontSize: 12,
        color: COLORS.WHITE
    },
    bold: {
        fontWeight: 'bold'
    },
    buttonText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600',
        alignSelf: 'center'
    }
});
