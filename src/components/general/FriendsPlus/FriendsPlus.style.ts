import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsPlusStyle = StyleSheet.create({
    iconButton: {
        marginHorizontal: 12
    },
    modalContainer: {
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100,
        justifyContent: 'space-evenly'
    },
    title: {
        paddingLeft: 2,
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    inputView: {
        height: 40,
        marginTop: 15,
        paddingHorizontal: 5
    },
    touchableOpacity: {
        marginTop: 10,
        marginBottom: 5,
        alignSelf: 'center'
    },
    sendButton: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
