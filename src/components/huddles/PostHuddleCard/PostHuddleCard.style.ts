import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PostHuddleCardStyle = StyleSheet.create({
    container: {
        height: 210,
        width: '100%',
        padding: 15,
        paddingLeft: 12,
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_200
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    nameView: {
        flex: 1,
        marginLeft: 5,
        justifyContent: 'center'
    },
    nameText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    input: {
        flex: 1,
        margin: 5,
        fontSize: 16,
        color: COLORS.WHITE
    },
    buttonsContainer: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    photoButtonText: {
        fontSize: 24
    },
    postButtonView: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 40,
        backgroundColor: COLORS.PASTEL_PURPLE
    },
    postButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
