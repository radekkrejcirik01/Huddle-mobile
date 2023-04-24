import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StartHuddlePeopleContentStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%'
    },
    peopleText: {
        marginBottom: 10,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    listContentContainer: {
        paddingTop: 5,
        paddingBottom: 100
    },
    addButtonView: {
        bottom: '15%',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        position: 'absolute',
        alignSelf: 'center'
    },
    addButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
