import { StyleSheet } from 'react-native';
import DIMENSIONS from '@constants/DIMENSIONS';
import COLORS from '@constants/COLORS';

export const SmallHuddleListItemStyle = StyleSheet.create({
    container: {
        // ProfileScreen's padding horizontal is 5
        width: DIMENSIONS.width / 3 - 10,
        height: DIMENSIONS.width / 3 - 10,
        margin: 2.5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: COLORS.MAIN_ORANGE
    },
    flex: {
        flex: 1
    },
    whatText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    image: {
        width: 42,
        height: 42,
        borderRadius: 15,
        alignSelf: 'flex-end'
    }
});
