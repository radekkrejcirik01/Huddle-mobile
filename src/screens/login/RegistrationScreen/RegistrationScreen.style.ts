import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RegistrationScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    inputsContainer: {
        paddingTop: '15%',
        paddingHorizontal: 10
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
        marginTop: 15
    },
    button: {
        marginBottom: 175,
        marginHorizontal: 10,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        backgroundColor: COLORS.GRAY_100
    },
    buttonText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600',
        alignSelf: 'center'
    }
});
