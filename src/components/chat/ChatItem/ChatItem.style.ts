import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import SHADOW from '@constants/SHADOW';

export const ChatItemStyle = StyleSheet.create({
    item: {
        marginBottom: 5,
        padding: 7.5,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    alignFlexEnd: {
        alignSelf: 'flex-end'
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
    image: {
        width: 25,
        height: 25,
        marginRight: 5,
        marginBottom: 8,
        borderRadius: 10,
        alignSelf: 'flex-end'
    },
    senderText: {
        marginBottom: 4,
        fontSize: 10,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: '600'
    },
    readView: {
        alignItems: 'flex-end'
    },
    readImage: {
        width: 15,
        height: 15,
        borderRadius: 10
    }
});
