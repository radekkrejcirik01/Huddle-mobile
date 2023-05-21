import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddHuddleStyle = StyleSheet.create({
    view: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    plusIcon: {
        marginRight: 4
    },
    addButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
