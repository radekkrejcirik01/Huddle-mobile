import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PersonProfileScreenStyle = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    friendStatus: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 75, // 125 - addDetailsButtonView height
        justifyContent: 'space-between'
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
    name: {
        marginTop: 15,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    mainButtonTouchableOpacity: {
        minWidth: 85,
        marginTop: 25,
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_WHITE,
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: COLORS.GRAY_100,
        fontWeight: '500'
    }
});
