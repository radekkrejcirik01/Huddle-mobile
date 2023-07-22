import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    description: {
        marginTop: 100,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subDescription: {
        marginTop: 10,
        color: COLORS.WHITE,
        alignSelf: 'center'
    },
    list: {
        flex: 1,
        paddingTop: 25
    },
    listContentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 100
    },
    addHuddleTouchableOpacity: {
        zIndex: 1,
        bottom: 30,
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100,
        position: 'absolute',
        alignSelf: 'center'
    },
    addHuddleText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    footerContainer: {
        paddingTop: '40%',
        alignItems: 'center'
    },
    footerTitleText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    footerButtonView: {
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    footerButtonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
