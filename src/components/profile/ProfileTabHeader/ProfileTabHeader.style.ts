import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileTabHeaderStyle = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    profileContent: {
        paddingHorizontal: 5,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 65,
        backgroundColor: COLORS.GRAY_400
    },
    menuView: {
        flex: 1,
        alignItems: 'flex-end'
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
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 18,
        backgroundColor: COLORS.BLACK_200,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 13,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    letterSpacing: {
        letterSpacing: -8
    }
});
