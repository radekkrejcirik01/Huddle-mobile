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
    image: {
        height: 30,
        width: 30,
        borderRadius: 20
    },
    nameText: {
        marginLeft: 10,
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
