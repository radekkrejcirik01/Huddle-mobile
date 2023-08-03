import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleEditableCardStyle = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        padding: 15,
        paddingLeft: 12,
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_200
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    titleView: {
        flex: 1,
        marginLeft: 5,
        paddingBottom: 2,
        justifyContent: 'center'
    },
    titleText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    input: {
        flex: 1,
        margin: 5,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    sendView: {
        marginRight: 10,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 40,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'flex-end'
    },
    sendText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
