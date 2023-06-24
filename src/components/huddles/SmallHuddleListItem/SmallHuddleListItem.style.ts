import { StyleSheet } from 'react-native';
import DIMENSIONS from '@constants/DIMENSIONS';
import COLORS from '@constants/COLORS';

export const SmallHuddleListItemStyle = StyleSheet.create({
    container: {
        // ProfileScreen has horizontal padding
        width: DIMENSIONS.width / 3 - 8,
        height: DIMENSIONS.width / 3 - 8,
        margin: 2.5,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topicText: {
        bottom: 5,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
