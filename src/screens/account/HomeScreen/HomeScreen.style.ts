import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    content: {
        flex: 1,
        paddingTop: 20
    },
    flex: {
        flex: 1
    },
    title: {
        marginBottom: 10,
        fontSize: 14,
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
