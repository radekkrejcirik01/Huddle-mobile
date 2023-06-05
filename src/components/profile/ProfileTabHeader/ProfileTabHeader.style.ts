import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileTabHeaderStyle = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    profileContent: {
        paddingHorizontal: 5,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
    },
    image: {
        width: 50,
        height: 50,
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
