import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationScreenStyle = StyleSheet.create({
    header: {
        shadowOpacity: 0,
        backgroundColor: COLORS.BLACK
    },
    container: {
        paddingTop: 10
    },
    content: {
        width: '100%',
        height: '100%'
    },
    titleView: {
        marginTop: 5,
        alignItems: 'center'
    },
    image: {
        height: 55,
        width: 55,
        borderRadius: 30
    },
    name: {
        marginTop: 5,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    status: {
        marginTop: 5,
        fontSize: 11,
        opacity: 0.7,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
