import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '500'
    },
    description: {
        marginTop: 100,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descriptionButtonView: {
        marginTop: '50%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center'
    },
    descriptionButtonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
