import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleEditableCardStyle = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputsContainer: {
        flex: 1
    },
    input: {
        height: '45%',
        width: '90%',
        paddingTop: 10,
        paddingVertical: 8,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 15,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
