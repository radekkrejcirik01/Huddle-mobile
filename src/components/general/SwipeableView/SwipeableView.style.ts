import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SwipeableViewStyle = StyleSheet.create({
    swipeableContainer: {
        overflow: 'visible'
    },
    view: {
        alignSelf: 'center'
    },
    text: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
