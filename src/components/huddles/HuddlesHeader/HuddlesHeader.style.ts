import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesHeaderStyle = StyleSheet.create({
    view: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        marginRight: 20,
        fontSize: 25,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
