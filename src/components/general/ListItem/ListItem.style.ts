import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ListItemStyle = StyleSheet.create({
    touchableOpacity: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    title: {
        paddingVertical: 14,
        fontSize: 17,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    flex: {
        flex: 1
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
