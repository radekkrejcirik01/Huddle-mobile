import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ListItemStyle = StyleSheet.create({
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 17,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    containerRight: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    description: {
        marginRight: 10,
        color: COLORS.WHITE
    }
});
