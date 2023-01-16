import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsListItemStyle = StyleSheet.create({
    itemView: {
        height: 50,
        marginVertical: 5,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentView: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    itemImage: {
        width: 32,
        height: 32,
        marginRight: 12,
        borderRadius: 25
    },
    flexRow: {
        flexDirection: 'row'
    },
    itemTextUsername: {
        fontSize: 12.5,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    itemTextDescription: {
        fontSize: 12.5,
        color: COLORS.LIGHTGRAY,
        fontWeight: '500'
    },
    acceptButton: {
        width: 90,
        marginTop: 5,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    acceptText: {
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
