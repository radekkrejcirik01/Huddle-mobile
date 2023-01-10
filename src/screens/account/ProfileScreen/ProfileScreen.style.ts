import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingHorizontal: 5
    },
    infoContainer: {
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 45
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
    lastItem: {
        marginTop: 100,
        marginBottom: 50,
        borderColor: COLORS.LIGHTGRAY_100
    }
});
