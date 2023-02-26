import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PersonAccountScreenStyle = StyleSheet.create({
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
        minWidth: 100,
        marginTop: 25,
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_BLUE,
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    addDetailsButtonView: {
        height: 50,
        marginTop: 35
    }
});
