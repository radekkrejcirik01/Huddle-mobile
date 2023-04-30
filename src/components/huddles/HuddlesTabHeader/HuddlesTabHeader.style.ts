import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesTabHeaderStyle = StyleSheet.create({
    header: {
        paddingTop: 5,
        paddingHorizontal: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row'
    },
    iconButton: {
        marginRight: 20
    },
    peopleView: {
        alignItems: 'center'
    },
    peopleText: {
        fontSize: 12.5,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    peopleNumber: {
        fontSize: 12.5,
        opacity: 0.9,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
