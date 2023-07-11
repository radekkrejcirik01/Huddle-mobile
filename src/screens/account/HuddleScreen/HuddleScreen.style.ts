import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import DIMENSIONS from '@constants/DIMENSIONS';

export const HuddleScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    editButton: {
        marginRight: 20
    },
    deleteButton: {
        marginLeft: 20
    },
    margin20: {
        marginTop: 20,
        marginHorizontal: 20
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    huddleListItem: {
        marginBottom: 0
    },
    title: {
        marginTop: 30,
        marginBottom: 20,
        paddingLeft: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    swipeableView: {
        marginRight: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100
    },
    emptyListText: {
        marginLeft: 20,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    listContentContainer: {
        paddingBottom: DIMENSIONS.height / 3
    },
    repostView: {
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
    repostText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
