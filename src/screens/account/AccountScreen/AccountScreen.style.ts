import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'space-between'
    },
    infoContainer: {
        alignItems: 'center'
    },
    name: {
        marginTop: 15,
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    username: {
        opacity: 0.8,
        color: COLORS.WHITE,
        fontWeight: '500'
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
