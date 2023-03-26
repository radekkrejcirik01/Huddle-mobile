import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    inputView: {
        height: 45,
        marginTop: 15,
        borderWidth: 0,
        backgroundColor: COLORS.GRAY_100
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        color: COLORS.GRAY_800,
        fontWeight: '500'
    },
    flashListView: {
        width: '100%',
        height: '100%',
        marginTop: 10
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
    }
});
