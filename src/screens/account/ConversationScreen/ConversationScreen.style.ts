import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationScreenStyle = StyleSheet.create({
    container: {
        paddingTop: 2,
        backgroundColor: COLORS.BLACK_300
    },
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.BLACK
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 60
    }
});
