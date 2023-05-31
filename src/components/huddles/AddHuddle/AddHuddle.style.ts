import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddHuddleStyle = StyleSheet.create({
    view: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    createText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
