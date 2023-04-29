import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileDetailsScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 5,
        justifyContent: 'space-between'
    },
    infoContainer: {
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 45,
        backgroundColor: COLORS.GRAY_100
    },
    firstname: {
        marginTop: 15,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    username: {
        color: COLORS.WHITE
    },
    buttons: {
        paddingBottom: 100
    }
});
