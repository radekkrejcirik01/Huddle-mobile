import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PeopleScreenStyle = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        paddingHorizontal: 5
    },
    header: {
        paddingRight: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        paddingTop: 10,
        paddingLeft: 5,
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    iconContainer: {
        marginTop: 5,
        paddingRight: 5,
        flexDirection: 'row'
    },
    bellIcon: {
        marginRight: 20
    },
    scrollView: {
        marginTop: 10
    },
    inputView: {
        height: 40,
        marginTop: 5,
        borderWidth: 0,
        backgroundColor: COLORS.GRAY_100
    },
    input: {
        paddingLeft: 10,
        fontSize: 15,
        color: COLORS.GRAY_800,
        fontWeight: '500'
    }
});
