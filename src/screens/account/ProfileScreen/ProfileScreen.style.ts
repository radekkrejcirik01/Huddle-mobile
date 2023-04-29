import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    content: {
        flex: 1,
        paddingTop: 22
    },
    contentHeaderView: {
        paddingLeft: 16,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addButtonView: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        backgroundColor: COLORS.MAIN_ORANGE,
        flexDirection: 'row',
        alignItems: 'center'
    },
    plusIcon: {
        marginLeft: 4
    },
    addButtonText: {
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    flex: {
        flex: 1
    },
    title: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    contentContainer: {
        paddingTop: 10
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
