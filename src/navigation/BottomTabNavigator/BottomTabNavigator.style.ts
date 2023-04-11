import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorStyle = StyleSheet.create({
    tabBar: {
        bottom: 5, // Lift the bottom bar
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
    right: {
        right: 2
    },
    tabLabel: {
        fontSize: 9,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
