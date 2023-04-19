import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesListItemStyle = StyleSheet.create({
    container: {
        height: 175,
        width: '100%',
        marginBottom: 15,
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_ORANGE,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
    },
    whatText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    whereText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    whenText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    nameText: {
        marginTop: 10,
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    rightContainer: {
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        height: 55,
        width: 55,
        borderRadius: 30
    },
    handView: {
        height: 38,
        width: 60,
        borderRadius: 20,
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
