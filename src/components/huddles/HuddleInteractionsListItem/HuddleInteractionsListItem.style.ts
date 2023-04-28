import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleInteractionsListItemStyle = StyleSheet.create({
    container: {
        marginBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 45,
        width: 45,
        borderRadius: 20
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
        backgroundColor: COLORS.BUTTON_BLUE
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
