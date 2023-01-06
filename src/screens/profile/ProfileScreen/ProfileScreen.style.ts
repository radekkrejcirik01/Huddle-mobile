import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        paddingHorizontal: 10
    },
    title: {
        paddingTop: 10,
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    image: {
        width: 125,
        height: 125,
        marginTop: 20,
        borderRadius: 20,
        alignSelf: 'center'
    },
    name: {
        marginTop: 20,
        fontSize: 18,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: '500'
    }
});
