import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SectionListStyle = StyleSheet.create({
    sectionHeader: {
        paddingBottom: 5,
        fontSize: 15,
        color: COLORS.MAIN_WHITE,
        fontWeight: 'bold'
    },
    itemContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemView: {
        marginRight: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: COLORS.MAIN_WHITE,
        backgroundColor: COLORS.MAIN_WHITE
    },
    blackBgColor: {
        backgroundColor: COLORS.BLACK
    },
    mainWhiteColor: {
        color: COLORS.MAIN_WHITE
    },
    itemRow: {
        flexDirection: 'row'
    },
    itemText: {
        color: COLORS.GRAY_100
    },
    itemImage: {
        width: 35,
        height: 35,
        marginLeft: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        color: COLORS.WHITE
    }
});
