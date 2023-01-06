import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StackNavigatorStyle = StyleSheet.create({
    navigationScreen: {
        shadowOpacity: 0,
        backgroundColor: COLORS.TRANSPARENT
    },
    headerBackTitle: {
        fontWeight: '600'
    },
    bottomBorder: {
        // borderBottomWidth: 0.25,
        // borderBottomColor: COLORS.MAIN_BLUE_100
    }
});
