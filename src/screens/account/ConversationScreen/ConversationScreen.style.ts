import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationScreenStyle = StyleSheet.create({
    headerRightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRightRow: {
        paddingTop: 5,
        paddingRight: 10
    },
    headerUsersView: {
        maxWidth: '120%',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    headerUsersItemView: {
        marginLeft: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerUsersItemImage: {
        width: 22,
        height: 22,
        borderRadius: 10
    },
    headerUsersItemText: {
        marginLeft: 2,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '500'
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
