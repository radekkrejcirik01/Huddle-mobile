import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 5,
        justifyContent: 'space-between'
    },
    infoContainer: {
        alignItems: 'center'
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
    item: {
        marginTop: 50,
        marginHorizontal: 15
    },
    buttons: {
        marginHorizontal: 15,
        paddingBottom: 100
    }
});
