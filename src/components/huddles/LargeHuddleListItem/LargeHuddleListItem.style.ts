import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LargeHuddleListItemStyle = StyleSheet.create({
    container: {
        height: 145,
        width: '100%',
        padding: 15,
        paddingLeft: 12,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_ORANGE,
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
    image: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    nameView: {
        width: 60, // width of the profile image
        alignItems: 'center'
    },
    nameText: {
        marginTop: 5,
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    commentsText: {
        fontSize: 14,
        color: COLORS.WHITE
    },
    infoView: {
        flex: 1,
        paddingLeft: 15
    },
    whatText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    handView: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 30,
        backgroundColor: COLORS.MAIN_WHITE,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    handText: {
        fontSize: 22,
        color: COLORS.MAIN_ORANGE
    }
});
