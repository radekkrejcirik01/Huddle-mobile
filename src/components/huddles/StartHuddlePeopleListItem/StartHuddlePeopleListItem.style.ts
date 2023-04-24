import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StartHuddlePeopleListItemStyle = StyleSheet.create({
    view: {
        flex: 1,
        padding: 15,
        alignItems: 'center'
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 30,
        borderWidth: 3
    },
    text: {
        marginTop: 5,
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
