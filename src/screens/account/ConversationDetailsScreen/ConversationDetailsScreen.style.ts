import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ConversationDetailsScreenStyle = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    container: {
        paddingTop: 5,
        paddingHorizontal: 15
    },
    box: {
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: COLORS.GRAY_100
    },
    view: {
        height: 45,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleEmoji: {
        fontSize: 16
    },
    titleText: {
        marginLeft: 10,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    icon: {
        opacity: 0.5
    },
    switch: {
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
    }
});
