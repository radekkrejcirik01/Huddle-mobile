import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HangoutDetailScreenStyle = StyleSheet.create({
    save: {
        marginRight: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
        paddingBottom: 75,
        justifyContent: 'space-between'
    },
    imageTouchableOpacity: {
        margin: 10,
        borderRadius: 65,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    image: {
        width: 140,
        height: 140,
        backgroundColor: COLORS.GRAY_100
    },
    text: {
        marginTop: 15,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    inputView: {
        marginTop: 10
    },
    row: {
        flexDirection: 'row'
    },
    peopleTouchableOpacity: {
        marginRight: 15,
        marginTop: 10,
        height: 45, // same height as input
        flexDirection: 'row',
        alignItems: 'center'
    },
    peopleImage: {
        width: 25,
        height: 25,
        borderRadius: 20
    },
    peopleText: {
        marginLeft: 7,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
