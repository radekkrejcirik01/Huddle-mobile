import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleInteractionsListItemStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        paddingLeft: 10,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    buttonView: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_200
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
