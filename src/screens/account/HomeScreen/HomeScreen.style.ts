import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    content: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'space-between'
    },
    title: {
        marginBottom: 10,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 100,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    addHuddleTouchableOpacity: {
        marginBottom: 40,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100,
        alignSelf: 'center'
    },
    addHuddleText: {
        padding: 10,
        color: COLORS.WHITE
    }
});
