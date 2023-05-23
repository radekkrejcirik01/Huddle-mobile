import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SettingsScreenStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    },
    box: {
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: COLORS.GRAY_100
    },
    view: {
        height: 42,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleEmoji: {
        fontSize: 16,
        marginRight: 10
    },
    titleText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    icon: {
        opacity: 0.5
    }
});
