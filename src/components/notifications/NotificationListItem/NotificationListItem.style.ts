import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationListItemStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 8,
        flexDirection: 'row'
    },
    content: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        height: 45,
        width: 45,
        borderRadius: 15
    },
    innerContainer: {
        flex: 1,
        paddingLeft: 10
    },
    message: {
        fontSize: 13,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    time: {
        fontSize: 13,
        opacity: 0.7,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    buttonContainer: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
