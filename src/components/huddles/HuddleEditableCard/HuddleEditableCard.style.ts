import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddleEditableCardStyle = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        padding: 15,
        paddingLeft: 12,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    titleView: {
        flex: 1,
        paddingLeft: 10
    },
    titleText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    input: {
        paddingTop: 0,
        paddingLeft: 2,
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
