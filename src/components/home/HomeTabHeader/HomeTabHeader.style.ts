import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeTabHeaderStyle = StyleSheet.create({
    header: {
        paddingRight: 2,
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
        alignSelf: 'center',
        fontWeight: '600'
    },
    title: {
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    hangoutsContainer: {
        marginLeft: 10
    },
    bellIcon: {
        alignItems: 'flex-end'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100
    }
});
