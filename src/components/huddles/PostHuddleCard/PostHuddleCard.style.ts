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
    titleView: {
        flex: 1,
        marginLeft: 5,
        paddingBottom: 2,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    input: {
        flex: 1,
        margin: 5,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    sendView: {
        marginRight: 8,
        marginBottom: 6,
        paddingVertical: 12,
        paddingRight: 10,
        paddingLeft: 14,
        borderRadius: 35,
        backgroundColor: COLORS.BLACK_100,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
