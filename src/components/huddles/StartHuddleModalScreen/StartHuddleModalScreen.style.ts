import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StartHuddleModalScreenStyle = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: COLORS.BLACK,
        justifyContent: 'space-evenly'
    },
    huddleText: {
        fontSize: 25,
        color: COLORS.WHITE,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    addButtonView: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center'
    },
    addButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
