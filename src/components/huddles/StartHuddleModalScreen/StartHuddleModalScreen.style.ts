import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StartHuddleModalScreenStyle = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: COLORS.BLACK,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    addButtonView: {
        paddingVertical: 12,
        width: '90%',
        borderRadius: 10,
        backgroundColor: COLORS.MESSAGE_BLUE,
        alignItems: 'center'
    },
    addButtonText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
