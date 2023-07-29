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
        paddingTop: 5,
        paddingHorizontal: '5%',
        borderTopWidth: 0,
        backgroundColor: COLORS.BLACK
    },
    right: {
        right: 2
    }
});
