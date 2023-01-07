import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        paddingTop: 5,
        paddingHorizontal: 10
    },
    header: {
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerInnerContainer: {
        flex: 1,
        flexDirection: 'row',
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
    iconContainer: {
        marginTop: 5,
        paddingRight: 5,
        flexDirection: 'row'
    },
    bellIcon: {
        marginRight: 20
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 20
    },
    comingsUpContainer: {
        flex: 1,
        paddingTop: 20
    },
    comingsUpTitle: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
