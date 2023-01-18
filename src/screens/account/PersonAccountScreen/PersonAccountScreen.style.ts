import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PersonAccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 65,
        alignSelf: 'center'
    },
    name: {
        marginTop: 15,
        fontSize: 15,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: '500'
    },
    hangoutTouchableOpacity: {
        width: 120,
        marginTop: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.MAIN_BLUE,
        alignSelf: 'center',
        alignItems: 'center'
    },
    hangoutText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
