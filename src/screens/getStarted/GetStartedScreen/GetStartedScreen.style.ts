import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LoginScreenStyle = StyleSheet.create({
    container: {
        paddingTop: '50%',
        paddingHorizontal: '10%',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    marginTop: {
        marginTop: '50%'
    },
    descriptionText: {
        marginTop: 5,
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    buttonView: {
        marginTop: '60%',
        marginHorizontal: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    buttonText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600',
        alignSelf: 'center'
    }
});
