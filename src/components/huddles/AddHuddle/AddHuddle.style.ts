import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddHuddleStyle = StyleSheet.create({
    view: {
        marginLeft: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    createText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
