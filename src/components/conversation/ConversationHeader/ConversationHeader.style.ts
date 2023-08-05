import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsView: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textsView: {
        marginLeft: 5
    },
    nameText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    tapHereText: {
        fontSize: 11,
        opacity: 0.8,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
