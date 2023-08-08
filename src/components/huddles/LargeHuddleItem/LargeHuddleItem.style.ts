import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LargeHuddleItemStyle = StyleSheet.create({
    container: {
        minHeight: 200,
        minWidth: '100%',
        padding: 15,
        paddingLeft: 12,
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_50,
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
        marginVertical: 5,
        fontSize: 16,
        color: COLORS.WHITE
    },
    photoMessageText: {
        paddingHorizontal: 4,
        backgroundColor: COLORS.PASTEL_PURPLE,
        alignSelf: 'flex-start'
    },
    numberText: {
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
        backgroundColor: COLORS.BLACK_100,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    likeText: {
        fontSize: 22
    },
    photoContainer: {
        minHeight: 400,
        minWidth: '100%'
    },
    imageView: {
        flex: 1,
        padding: 15,
        paddingLeft: 12,
        borderRadius: 15,
        justifyContent: 'space-between'
    }
});
