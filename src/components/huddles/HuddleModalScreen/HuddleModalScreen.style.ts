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
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 25,
        backgroundColor: COLORS.BUTTON_BLUE,
        position: 'absolute',
        bottom: '15%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postAgainText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
