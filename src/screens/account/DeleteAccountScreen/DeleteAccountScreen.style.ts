import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const DeleteAccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    title: {
        fontSize: 17,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    buttonsContainer: {
        marginBottom: 150,
        flex: 1,
        justifyContent: 'flex-end'
    },
    confirm: {
        fontSize: 17,
        color: COLORS.WHITE,
        fontWeight: '600',
        alignSelf: 'center'
    },
    notNowContainer: {
        marginTop: 30,
        padding: 10,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_BLUE,
        alignSelf: 'center'
    },
    notNow: {
        fontSize: 17,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
