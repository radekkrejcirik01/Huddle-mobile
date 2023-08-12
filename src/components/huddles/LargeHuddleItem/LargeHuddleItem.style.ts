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
    flex: {
        flex: 1
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    marginTop: {
        marginTop: 5
    },
    nameView: {
        marginLeft: 5,
        justifyContent: 'center'
    },
    nameText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    shadowText: {
        textShadowRadius: 2,
        textShadowColor: COLORS.GRAY_200
    },
    shadowView: {
        shadowRadius: 2,
        shadowColor: COLORS.GRAY_200
    },
    messageText: {
        marginTop: 5,
        fontSize: 16,
        color: COLORS.WHITE
    },
    photoMessageText: {
        marginTop: 5,
        marginRight: 10,
        fontSize: 16,
        color: COLORS.WHITE,
        alignSelf: 'flex-start'
    },
    numberText: {
        margin: 5,
        color: COLORS.WHITE,
        fontWeight: '500'
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
        minHeight: 450,
        minWidth: '100%',
        borderRadius: 20,
        backgroundColor: COLORS.BLACK_50
    },
    imageView: {
        flex: 1,
        padding: 15,
        paddingTop: 10,
        paddingLeft: 12,
        borderRadius: 20,
        justifyContent: 'flex-end'
    }
});
