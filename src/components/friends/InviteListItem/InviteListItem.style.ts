import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InviteListItemStyle = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pressView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 25
    },
    usernameText: {
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    acceptView: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center'
    },
    acceptText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
