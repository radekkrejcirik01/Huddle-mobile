import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileTabHeaderStyle = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    buttonsContainer: {
        width: '60%',
        marginVertical: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 4,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 18,
        backgroundColor: COLORS.BLACK_50,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 13,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    letterSpacing: {
        letterSpacing: -8
    }
});
