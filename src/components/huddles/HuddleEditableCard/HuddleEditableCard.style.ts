import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleEditableCardStyle = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100,
        flexDirection: 'row'
    },
    inputsContainer: {
        flex: 1,
        paddingRight: 10
    },
    primaryInput: {
        width: '90%',
        paddingVertical: 8,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 15,
        fontSize: 16,
        color: COLORS.WHITE,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30
    }
});
