import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PeopleScreenStyle = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        paddingHorizontal: 5
    },
    title: {
        paddingTop: 10,
        fontSize: 26,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold'
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
