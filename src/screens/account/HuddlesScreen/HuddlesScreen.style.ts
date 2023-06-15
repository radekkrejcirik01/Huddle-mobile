import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlesScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },
    description: {
        marginTop: 100,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listContentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 25
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
