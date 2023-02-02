import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsListItemStyle = StyleSheet.create({
    itemView: {
        height: 50,
        marginVertical: 5,
        flexDirection: 'row'
    },
    contentView: {
        flex: 1,
        flexDirection: 'row'
    },
    itemImage: {
        width: 32,
        height: 32,
        marginRight: 12,
        borderRadius: 25
    },
    itemTextContainer: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row'
    },
    itemTextDescription: {
        fontSize: 12.5,
        color: COLORS.LIGHTGRAY,
        fontWeight: '500'
    },
    itemTextUsername: {
        color: COLORS.WHITE
    },
    acceptButton: {
        width: 100,
        height: 35,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptText: {
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
