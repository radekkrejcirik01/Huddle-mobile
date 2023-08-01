import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import DIMENSIONS from '@constants/DIMENSIONS';

export const HuddleScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    margin20: {
        marginTop: 20,
        marginHorizontal: 20
    },
    huddleListItem: {
        marginBottom: 0
    },
    title: {
        marginTop: 20,
        marginBottom: 16,
        paddingLeft: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    listContentContainer: {
        paddingBottom: DIMENSIONS.height / 3
    }
});
