import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    listContentContainer: {
        padding: 10
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
    }
});
