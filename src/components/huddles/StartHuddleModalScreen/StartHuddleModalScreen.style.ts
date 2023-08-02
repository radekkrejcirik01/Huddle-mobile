import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StartHuddleModalScreenStyle = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: COLORS.BLACK,
        justifyContent: 'space-evenly'
    },
    titleText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    addButtonView: {
        paddingVertical: 12,
        width: '100%',
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center'
    },
    addButtonText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
