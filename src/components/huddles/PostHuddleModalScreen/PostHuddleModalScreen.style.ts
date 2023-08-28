import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PostHuddleModalScreenStyle = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: COLORS.BLACK,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    subtitle: {
        color: COLORS.BUTTON_BLUE
    },
    card: {
        marginTop: '10%'
    }
});
