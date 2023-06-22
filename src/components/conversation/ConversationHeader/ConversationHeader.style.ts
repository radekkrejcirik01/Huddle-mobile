import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    nameText: {
        marginLeft: 5,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});