import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleModalScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.BLACK
    },
    margin20: {
        margin: 20
    },
    editView: {
        marginBottom: 15,
        alignSelf: 'flex-end'
    },
    editText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    huddlesListItem: {
        marginBottom: 5
    },
    interactionsText: {
        paddingLeft: 20,
        paddingBottom: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    itemContainer: {
        flex: 1,
        marginBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemPhoto: {
        height: 45,
        width: 45,
        borderRadius: 20
    },
    itemName: {
        paddingLeft: 10,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    itemButtonView: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    itemButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    listContentContainer: {
        padding: 10
    }
});
