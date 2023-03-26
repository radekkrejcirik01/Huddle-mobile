import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ReactionsContentStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '45%',
        paddingTop: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    contentContainerStyle: {
        paddingBottom: 50
    },
    row: {
        padding: 15,
        flexDirection: 'row'
    },
    text: {
        paddingLeft: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
