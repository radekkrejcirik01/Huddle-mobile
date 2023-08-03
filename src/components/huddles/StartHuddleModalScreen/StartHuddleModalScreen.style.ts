import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StartHuddleModalScreenStyle = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: COLORS.BLACK,
        justifyContent: 'center'
    },
    title: {
        marginBottom: '20%',
        fontSize: 22,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    description: {
        margin: 10,
        color: COLORS.LIGHTGRAY
    }
});
