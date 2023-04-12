import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeTabHeaderStyle = StyleSheet.create({
    container: {
        paddingRight: 7,
        flexDirection: 'row'
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
    hangoutsContainer: {
        marginLeft: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100
    },
    row: {
        flexDirection: 'row'
    },
    plus: {
        marginRight: 12
    }
});
