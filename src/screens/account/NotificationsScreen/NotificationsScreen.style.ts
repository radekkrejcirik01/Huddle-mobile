import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    itemImage: {
        height: 45,
        width: 45,
        borderRadius: 15
    },
    itemInnerContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
    },
    itemMessage: {
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    itemTime: {
        opacity: 0.7,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    itemButtonText: {
        marginLeft: 20,
        fontSize: 15,
        color: COLORS.BUTTON_BLUE,
        fontWeight: '600'
    },
    listContentContainer: {
        paddingTop: 15,
        paddingHorizontal: 5
    }
});
