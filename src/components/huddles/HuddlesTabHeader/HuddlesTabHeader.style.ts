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
        fontSize: 24,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
