import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LargeHuddleListItemStyle = StyleSheet.create({
    container: {
        height: 200,
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
    whatView: {
        flex: 1,
        paddingLeft: 15
    },
    whatText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
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
        fontSize: 24,
        color: COLORS.MAIN_ORANGE
    }
});
