import { StyleSheet } from 'react-native';
import DIMENSIONS from '@constants/DIMENSIONS';
import COLORS from '@constants/COLORS';

export const SmallHuddleItemStyle = StyleSheet.create({
    container: {
        // ProfileScreen has horizontal padding
        width: DIMENSIONS.width / 3 - 8,
        height: DIMENSIONS.width / 3 - 8,
        margin: 2.5,
        padding: 20,
        borderRadius: 12,
        backgroundColor: COLORS.PASTEL_PURPLE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageText: {
        bottom: 5,
        right: 2,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
