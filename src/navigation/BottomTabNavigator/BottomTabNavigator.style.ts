import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorStyle = StyleSheet.create({
    tabBar: {
        top: -5, // Lift the bottom bar
        marginTop: 10,
        paddingHorizontal: 15,
        borderTopWidth: 0,
        backgroundColor: COLORS.TRANSPARENT
    },
    tabBarLabel: {
        fontSize: 9,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    tabBarProfile: {
        backgroundColor: COLORS.BLACK
    },
    peopleHeaderView: {
        paddingTop: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    peopleHeaderContent: {
        fontSize: 26,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});
