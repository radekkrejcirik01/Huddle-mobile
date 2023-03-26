import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsTabHeaderStyle = StyleSheet.create({
    header: {
        height: 50, // height of image in HomeTabHeader
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        fontSize: 26,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
