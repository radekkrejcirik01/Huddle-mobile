import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MuteHuddlesListItemStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 10,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    unmuteView: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    unmuteText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
