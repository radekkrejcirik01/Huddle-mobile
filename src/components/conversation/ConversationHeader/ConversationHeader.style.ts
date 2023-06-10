import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationHeaderStyle = StyleSheet.create({
    container: {
        top: 10,
        left: 10,
        borderRadius: 25,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    view: {
        marginLeft: 20,
        paddingVertical: 6,
        paddingLeft: 14,
        paddingRight: 18,
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_200,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 20
    },
    name: {
        marginLeft: 5,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
