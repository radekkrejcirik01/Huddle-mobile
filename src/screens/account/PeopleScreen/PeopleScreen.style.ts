import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PeopleScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 5
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '500'
    },
    itemView: {
        height: 55,
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
        width: 35,
        height: 35,
        borderRadius: 25
    },
    listContentContainer: {
        paddingTop: 10
    }
});
