import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    content: {
        flex: 1,
        paddingTop: 25
    },
    flex: {
        flex: 1
    },
    title: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    contentContainer: {
        paddingTop: 10
    },
    description: {
        marginTop: 100,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
