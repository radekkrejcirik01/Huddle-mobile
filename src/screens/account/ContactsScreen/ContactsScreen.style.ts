import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ContactsScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        backgroundColor: COLORS.BLACK_300,
        fontWeight: '500'
    },
    inputView: {
        marginBottom: 5,
        backgroundColor: COLORS.BLACK_300
    },
    description: {
        marginTop: 100,
        fontSize: 18,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listContentContainer: {
        paddingTop: 10,
        paddingBottom: 100
    }
});
