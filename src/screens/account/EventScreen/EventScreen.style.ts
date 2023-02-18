import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EventScreenStyle = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 125,
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
    text: {
        marginTop: 15,
        fontSize: 15,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: '500'
    },
    time: {
        fontSize: 25
    },
    row: {
        width: 200,
        marginTop: 35,
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_BLUE,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
