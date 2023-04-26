import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleEditableCardStyle = StyleSheet.create({
    container: {
        height: 165,
        width: '100%',
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_ORANGE,
        flexDirection: 'row'
    },
    inputsContainer: {
        flex: 1,
        paddingRight: 10
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
    image: {
        height: 60,
        width: 60,
        borderRadius: 30
    }
});
