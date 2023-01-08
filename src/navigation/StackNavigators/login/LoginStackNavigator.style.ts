import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LoginStackNavigatorStyle = StyleSheet.create({
    header: {
        shadowOpacity: 0,
        backgroundColor: COLORS.TRANSPARENT
    },
    headerTitle: {
        color: COLORS.WHITE
    },
    headerLeft: {
        paddingLeft: 20
    }
});
