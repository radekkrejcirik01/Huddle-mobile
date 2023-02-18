import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SectionListStyle = StyleSheet.create({
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
        marginRight: 5,
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
        marginLeft: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        borderWidth: 1,
        borderColor: COLORS.WHITE
    },
    text: {
        fontSize: 18,
        color: COLORS.WHITE
    }
});
