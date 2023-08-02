import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsView: {
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 5,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
