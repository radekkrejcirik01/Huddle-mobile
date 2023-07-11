import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ParticipantsListStyle = StyleSheet.create({
    touchableOpacity: {
        marginRight: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    opacity: {
        opacity: 0.7
    },
    image: {
        width: 25,
        height: 25,
        borderRadius: 20
    },
    text: {
        marginLeft: 7,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
