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
        marginBottom: '20%',
        fontSize: 24,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
