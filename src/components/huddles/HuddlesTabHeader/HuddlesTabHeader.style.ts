import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesTabHeaderStyle = StyleSheet.create({
    header: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    addHuddleView: {
        flex: 1,
        alignItems: 'flex-end'
    }
});
