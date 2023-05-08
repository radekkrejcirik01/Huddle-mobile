import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import SHADOW from '@constants/SHADOW';

export const MessageListItemStyle = StyleSheet.create({
    item: {
        maxWidth: '75%',
        marginBottom: 5,
        padding: 7.5,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    alignFlexEnd: {
        alignSelf: 'flex-end'
    },
    alignFlexStart: {
        alignSelf: 'flex-start'
    },
    lightBorder: {
        padding: 6.5,
        borderWidth: 1,
        borderColor: COLORS.WHITE
    },
    darkBorder: {
        ...SHADOW.CHAT_ITEM
    },
    text: {
        margin: 4,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profilePhoto: {
        width: 25,
        height: 25,
        marginRight: 5,
        marginBottom: 8,
        borderRadius: 10,
        backgroundColor: COLORS.GRAY_100,
        alignSelf: 'flex-end'
    },
    image: {
        width: 175,
        height: 175,
        borderRadius: 15,
        backgroundColor: COLORS.GRAY_100
    },
    senderText: {
        marginBottom: 4,
        fontSize: 10,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: '600'
    },
    reactionText: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    readView: {
        alignItems: 'flex-end'
    },
    readImage: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: COLORS.GRAY_100
    },
    modal: {
        marginHorizontal: 0,
        marginBottom: 0,
        justifyContent: 'flex-end'
    }
});
