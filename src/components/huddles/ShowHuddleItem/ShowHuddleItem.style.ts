import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShowHuddleItemStyle = StyleSheet.create({
    view: {
        padding: 8,
        borderWidth: 1.5,
        borderRadius: 16,
        borderColor: COLORS.GRAY_100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 10,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
