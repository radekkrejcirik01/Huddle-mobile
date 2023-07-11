import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorStyle = StyleSheet.create({
    header: {
        shadowOpacity: 0,
        backgroundColor: COLORS.BLACK
    },
    rightTitleText: {
        marginRight: 20,
        fontSize: 25,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    tabBar: {
        bottom: 5, // Lift the bottom bar
        marginTop: 10,
        paddingHorizontal: '5%',
        borderTopWidth: 0,
        backgroundColor: COLORS.TRANSPARENT
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
