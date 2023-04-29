import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileTabHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 40,
        backgroundColor: COLORS.GRAY_100
    },
    usernameText: {
        marginLeft: 20,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flex: 1,
        marginRight: 4,
        alignItems: 'flex-end'
    }
});
