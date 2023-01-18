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
    }
});
