import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 10
    },
    header: {
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    numbersContainer: {
        marginLeft: 15,
        flexDirection: 'row'
    },
    number: {
        fontSize: 14,
        color: COLORS.LIGHTGRAY,
        alignSelf: 'center',
        fontWeight: '600'
    },
    title: {
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    hangoutsContainer: {
        marginLeft: 10
    },
    iconContainer: {
        marginTop: 5,
        paddingRight: 5,
        flexDirection: 'row'
    },
    bellIcon: {
        marginRight: 20
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 20
    },
    comingsUpContainer: {
        flex: 1,
        paddingTop: 20
    },
    comingsUpTitle: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    sectionHeader: {
        paddingBottom: 5,
        fontSize: 15,
        color: COLORS.WHITE,
        backgroundColor: COLORS.BLACK,
        fontWeight: 'bold'
    },
    itemContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemView: {
        marginRight: 10,
        marginBottom: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: COLORS.MAIN_BLUE
    },
    itemRow: {
        flexDirection: 'row'
    },
    itemText: {
        color: COLORS.WHITE
    },
    itemImage: {
        width: 35,
        height: 35,
        marginLeft: 5,
        borderRadius: 20
    }
});
