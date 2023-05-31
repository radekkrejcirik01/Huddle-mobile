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
        alignItems: 'center'
    },
    image: {
        height: 55,
        width: 55,
        borderRadius: 30
    }
});
