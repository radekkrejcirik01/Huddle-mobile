import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LargeHuddleListItemStyle = StyleSheet.create({
    container: {
        minHeight: 160,
        minWidth: '100%',
        padding: 15,
        paddingLeft: 12,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    nameView: {
        flex: 1,
        marginLeft: 5,
        paddingBottom: 2,
        justifyContent: 'center'
    },
    nameText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    moreIcon: {
        marginRight: 5
    },
    messageText: {
        margin: 5,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    commentsText: {
        margin: 5,
        fontSize: 14,
        color: COLORS.WHITE
    },
    flex: {
        flex: 1
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    likeView: {
        marginRight: 2,
        marginBottom: 2,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 35,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    likeText: {
        fontSize: 26
    }
});
