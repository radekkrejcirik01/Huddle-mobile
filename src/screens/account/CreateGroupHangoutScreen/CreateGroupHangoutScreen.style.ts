import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CreateGroupHangoutScreenStyle = StyleSheet.create({
    container: {
        marginTop: 5
    },
    input: {
        fontSize: 18
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
        borderRadius: 30
    },
    hangoutTouchableOpacity: {
        width: 120,
        marginTop: 50,
        padding: 10,
        borderRadius: 10,
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
