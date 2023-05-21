import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesTabHeaderStyle = StyleSheet.create({
    header: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
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
