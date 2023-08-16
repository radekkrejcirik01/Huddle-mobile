import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    settingsView: {
        marginRight: 15
    },
    header: {
        paddingBottom: 20
    },
    listContentContainer: {
        paddingTop: 10,
        paddingHorizontal: 5,
        paddingBottom: 50
    },
    description: {
        marginTop: 100,
        fontSize: 18,
        color: COLORS.WHITE,
        textAlign: 'center',
        fontWeight: '600'
    }
});
