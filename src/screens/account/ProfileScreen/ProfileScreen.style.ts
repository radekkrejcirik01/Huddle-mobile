import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 5
    },
    contentHeaderView: {
        paddingLeft: 5,
        paddingBottom: 10,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    addButtonView: {
        marginTop: 5,
        marginLeft: 5,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 15,
        backgroundColor: COLORS.BUTTON_BLUE,
        flexDirection: 'row',
        alignItems: 'center'
    },
    plusIcon: {
        marginRight: 4
    },
    addButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 100,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
