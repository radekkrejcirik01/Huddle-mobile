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
    colorsView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    colorView: {
        width: 45,
        height: 45,
        borderRadius: 30,
        borderColor: COLORS.WHITE,
        borderWidth: 0
    },
    redBackground: {
        backgroundColor: COLORS.PASTEL_RED
    },
    orangeBackground: {
        backgroundColor: COLORS.PASTEL_ORANGE
    },
    blueBackground: {
        backgroundColor: COLORS.PASTEL_BLUE
    },
    purpleBackground: {
        backgroundColor: COLORS.PASTEL_PURPLE
    },
    borderWidth: {
        borderWidth: 2
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
