import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsItemStyle = StyleSheet.create({
    container: {
        alignItems: 'flex-start'
    },
    row: {
        flexDirection: 'row'
    },
    image: {
        height: 55,
        width: 55,
        borderRadius: 50,
        backgroundColor: COLORS.GRAY_100
    },
    box: {
        flex: 1,
        paddingHorizontal: 10
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        marginLeft: 2,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    sentIcon: {
        top: -2, // fit the layout
        left: 4
    },
    time: {
        maxWidth: '65%',
        paddingBottom: 5,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 12,
        fontWeight: 'bold'
    }
});
