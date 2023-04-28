import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LargeHuddleListItemStyle = StyleSheet.create({
    container: {
        height: 165,
        width: '100%',
        marginBottom: 20,
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_ORANGE,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    whatText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    whereText: {
        marginTop: 5,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    whenText: {
        marginTop: 5,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    nameView: {
        height: 38,
        justifyContent: 'center'
    },
    nameText: {
        marginBottom: 5,
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    rightContainer: {
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    handView: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 30,
        backgroundColor: COLORS.MAIN_WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    handText: {
        fontSize: 22,
        color: COLORS.MAIN_ORANGE,
        fontWeight: 'bold'
    }
});
