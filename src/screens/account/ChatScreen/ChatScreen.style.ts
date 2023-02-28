import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatScreenStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    headerTitle: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 15,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100
    }
});
