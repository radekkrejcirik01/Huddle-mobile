import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesTabHeaderStyle = StyleSheet.create({
    header: {
        paddingLeft: 10,
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
        marginRight: 20,
        alignItems: 'center'
    },
    peopleText: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    peopleNumber: {
        fontSize: 12,
        opacity: 0.9,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
