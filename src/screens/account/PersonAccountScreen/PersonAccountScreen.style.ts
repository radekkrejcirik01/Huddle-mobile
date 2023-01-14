import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PersonAccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 65,
        alignSelf: 'center'
    },
    name: {
        marginTop: 15,
        fontSize: 15,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: '500'
    },
    hangoutTouchableOpacity: {
        marginTop: 25,
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.MAIN_BLUE,
        alignSelf: 'center'
    },
    hangoutText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    modalContainer: {
        padding: 15
    },
    title: {
        paddingLeft: 2,
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    tagsRow: {
        paddingTop: 10,
        flexDirection: 'row'
    },
    tagsItem: {
        marginRight: 5,
        padding: 7,
        borderRadius: 15
    },
    tagText: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    inputContainer: {
        paddingTop: 20
    },
    input: {
        paddingLeft: 5,
        fontSize: 14,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    inputView: {
        marginTop: 10,
        height: 40,
        borderWidth: 0,
        backgroundColor: COLORS.GRAY_100
    }
});
