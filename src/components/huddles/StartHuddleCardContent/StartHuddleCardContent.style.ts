import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StartHuddleCardContentStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    huddleText: {
        fontSize: 25,
        color: COLORS.WHITE,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cardContainer: {
        height: 165,
        width: '100%',
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_ORANGE,
        flexDirection: 'row'
    },
    primaryInput: {
        width: '90%',
        paddingVertical: 8,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 15,
        fontSize: 16,
        color: COLORS.MAIN_BROWN,
        backgroundColor: COLORS.MAIN_WHITE,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    secondaryInput: {
        width: '80%',
        marginTop: 8,
        paddingVertical: 6,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 13,
        fontSize: 15,
        color: COLORS.MAIN_BROWN,
        backgroundColor: COLORS.MAIN_WHITE,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
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
