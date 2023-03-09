import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EventScreenStyle = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 125,
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    imageView: {
        margin: 10,
        borderRadius: 65,
        overflow: 'hidden'
    },
    image: {
        width: 140,
        height: 140,
        backgroundColor: COLORS.GRAY_100
    },
    text: {
        marginTop: 15,
        fontSize: 18,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: '500'
    },
    usersContainer: {
        width: '70%',
        marginTop: 50,
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    userView: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    opacity: {
        opacity: 0.7
    },
    userText: {
        marginLeft: 10,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    userPhoto: {
        height: 25,
        width: 25,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100
    },
    row: {
        width: 200,
        marginTop: 35,
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_WHITE,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        color: COLORS.GRAY_100,
        fontWeight: '500'
    }
});
