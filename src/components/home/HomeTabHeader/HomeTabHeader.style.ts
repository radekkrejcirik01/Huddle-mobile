import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeTabHeaderStyle = StyleSheet.create({
    container: {
        paddingRight: 7,
        flexDirection: 'row'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 25,
        backgroundColor: COLORS.GRAY_100
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    numbersContainer: {
        marginLeft: 15,
        flexDirection: 'row'
    },
    number: {
        fontSize: 14,
        color: COLORS.LIGHTGRAY,
        fontWeight: '600',
        alignSelf: 'center'
    },
    title: {
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    huddlesContainer: {
        marginLeft: 10
    }
});
