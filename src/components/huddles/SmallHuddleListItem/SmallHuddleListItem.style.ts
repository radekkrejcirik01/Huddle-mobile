import { StyleSheet } from 'react-native';
import DIMENSIONS from '@constants/DIMENSIONS';
import COLORS from '@constants/COLORS';

export const SmallHuddleListItemStyle = StyleSheet.create({
    container: {
        // ProfileScreen has horizontal padding
        width: DIMENSIONS.width / 3 - 8,
        height: DIMENSIONS.width / 3 - 8,
        margin: 2.5,
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row'
    },
    whatText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
