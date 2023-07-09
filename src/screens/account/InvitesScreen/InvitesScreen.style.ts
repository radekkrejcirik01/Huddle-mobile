import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InvitesScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 15
    },
    description: {
        marginTop: 100,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
