import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PickPeopleListItemStyle = StyleSheet.create({
    itemView: {
        height: 50,
        marginVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 2,
        backgroundColor: COLORS.GRAY_100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemTextName: {
        fontSize: 12.5,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    itemTextUsername: {
        fontSize: 12.5,
        color: COLORS.LIGHTGRAY,
        fontWeight: '500'
    },
    itemImage: {
        width: 32,
        height: 32,
        borderRadius: 25
    }
});
