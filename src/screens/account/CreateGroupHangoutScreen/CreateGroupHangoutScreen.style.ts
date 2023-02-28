import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CreateGroupHangoutScreenStyle = StyleSheet.create({
    container: {
        marginTop: 5
    },
    input: {
        height: 45,
        flex: 1,
        fontSize: 18,
        color: COLORS.WHITE
    },
    inputView: {
        backgroundColor: COLORS.BLACK
    },
    imageTouchableOpacity: {
        margin: 10,
        alignSelf: 'flex-start'
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 30,
        backgroundColor: COLORS.GRAY_100
    },
    hangoutTouchableOpacity: {
        width: 120,
        marginTop: 50,
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_BLUE,
        alignSelf: 'center',
        alignItems: 'center'
    },
    hangoutText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
