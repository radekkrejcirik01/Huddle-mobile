import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    editButtonView: {
        marginRight: 20
    },
    deleteButtonView: {
        marginLeft: 20
    },
    margin20: {
        margin: 20
    },
    buttonsView: {
        marginBottom: 15,
        flexDirection: 'row'
    },
    contentSpace: {
        justifyContent: 'space-between'
    },
    contentEnd: {
        justifyContent: 'flex-end'
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    huddleListItem: {
        marginBottom: 5
    },
    interactionsText: {
        paddingLeft: 20,
        paddingBottom: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    listContentContainer: {
        padding: 10
    },
    postAgainView: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        position: 'absolute',
        bottom: '10%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postAgainText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
