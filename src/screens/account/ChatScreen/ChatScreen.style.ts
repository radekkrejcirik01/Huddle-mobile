import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatScreenStyle = StyleSheet.create({
    headerRightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRightRow: {
        paddingTop: 5,
        paddingRight: 10
    },
    headerTitle: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    container: {
        width: '100%',
        height: '100%'
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 15,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100
    }
});
