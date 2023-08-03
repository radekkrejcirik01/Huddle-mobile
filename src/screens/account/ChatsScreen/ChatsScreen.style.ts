import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 100
    },
    description: {
        marginTop: 100,
        fontSize: 18,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
