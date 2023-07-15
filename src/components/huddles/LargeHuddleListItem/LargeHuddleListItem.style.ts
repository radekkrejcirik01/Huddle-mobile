import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LargeHuddleListItemStyle = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        padding: 15,
        paddingLeft: 12,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    titleView: {
        flex: 1,
        paddingLeft: 10
    },
    titleText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    topicText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    moreIcon: {
        marginRight: 5
    },
    commentsText: {
        margin: 5,
        fontSize: 14,
        color: COLORS.WHITE
    },
    flex: {
        flex: 1
    },
    handView: {
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 30,
        backgroundColor: COLORS.GRAY_400,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    handText: {
        fontSize: 25
    }
});
