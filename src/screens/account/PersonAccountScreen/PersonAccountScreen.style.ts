import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PersonAccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 125,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 140,
        height: 140,
        marginTop: 15,
        borderRadius: 65
    },
    name: {
        marginTop: 15,
        fontSize: 15,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: '500'
    },
    hangoutTouchableOpacity: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.MAIN_BLUE
    },
    hangoutText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
