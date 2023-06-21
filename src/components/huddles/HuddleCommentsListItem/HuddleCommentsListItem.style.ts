import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleCommentsListItemStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: 'row',
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    imageView: {
        alignSelf: 'flex-start'
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    textsContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    nameView: {
        alignSelf: 'flex-start'
    },
    nameText: {
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    timeText: {
        marginLeft: 5,
        fontSize: 12,
        opacity: 0.8,
        color: COLORS.WHITE,
        fontWeight: '400'
    },
    mentionView: {
        marginLeft: 5,
        marginTop: -5,
        padding: 2.5,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.BUTTON_BLUE,
        backgroundColor: COLORS.BLACK,
        alignSelf: 'flex-start'
    },
    mentionText: {
        fontSize: 13,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    messageText: {
        marginTop: 5,
        color: COLORS.WHITE
    },
    likesView: {
        marginTop: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.MAIN_ORANGE,
        alignSelf: 'flex-start'
    },
    likesText: {
        color: COLORS.WHITE,
        fontWeight: '400'
    },
    heartText: {
        fontSize: 12
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
