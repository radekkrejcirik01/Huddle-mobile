import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsItemStyle = StyleSheet.create({
    container: {
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.BLACK_300,
        alignItems: 'flex-start'
    },
    row: {
        flexDirection: 'row'
    },
    box: {
        flex: 1,
        paddingHorizontal: 10
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dot: {
        width: 10,
        height: 10,
        left: 5,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    name: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    sentIcon: {
        top: -2, // fit the layout
        left: 4
    },
    time: {
        maxWidth: '65%',
        color: COLORS.WHITE
    },
    message: {
        fontWeight: '500'
    },
    newHuddlesView: {
        marginTop: 8,
        marginBottom: 4,
        paddingTop: 2,
        paddingBottom: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: COLORS.PASTEL_PURPLE,
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    newHuddlesText: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
