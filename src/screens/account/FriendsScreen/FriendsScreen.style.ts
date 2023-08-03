import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '500'
    },
    description: {
        marginTop: 100,
        fontSize: 18,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listContentContainer: {
        paddingTop: 10,
        paddingBottom: 100
    },
    newInviteView: {
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center',
        position: 'absolute'
    },
    newInviteText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
