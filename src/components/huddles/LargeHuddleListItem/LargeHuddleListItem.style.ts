import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LargeHuddleListItemStyle = StyleSheet.create({
    container: {
        height: 145,
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
    image: {
        height: 50,
        width: 50,
        borderRadius: 30
    },
    nameView: {
        width: 50, // width of the profile image
        marginTop: 10,
        alignItems: 'center'
    },
    nameText: {
        fontSize: 14,
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
        backgroundColor: COLORS.GRAY_400,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    handText: {
        fontSize: 22,
        color: COLORS.MAIN_ORANGE
    }
});
