import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileTabHeaderStyle = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    profileContent: {
        flex: 1,
        paddingHorizontal: 12,
        alignItems: 'center'
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 65,
        backgroundColor: COLORS.GRAY_100
    },
    nameText: {
        fontSize: 24,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        width: '80%',
        marginVertical: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 4,
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.GRAY_400,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 13,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
