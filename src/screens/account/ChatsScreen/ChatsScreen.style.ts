import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 100
    },
    description: {
        marginTop: 100,
        fontSize: 18,
        color: COLORS.WHITE,
        textAlign: 'center',
        fontWeight: '600'
    }
});
