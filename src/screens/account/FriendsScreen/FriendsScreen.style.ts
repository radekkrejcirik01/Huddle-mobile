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
        backgroundColor: COLORS.MESSAGE_BLUE,
        alignSelf: 'center'
    },
    descriptionButtonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    listContentContainer: {
        paddingTop: 10,
        paddingBottom: 100
    },
    newInviteView: {
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: COLORS.MESSAGE_BLUE,
        alignSelf: 'center',
        position: 'absolute'
    },
    newInviteText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
