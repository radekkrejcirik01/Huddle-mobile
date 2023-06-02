import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesTabHeaderStyle = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
    },
    title: {
        fontSize: 25,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    addHuddleView: {
        flex: 1,
        alignItems: 'flex-end'
    }
});
