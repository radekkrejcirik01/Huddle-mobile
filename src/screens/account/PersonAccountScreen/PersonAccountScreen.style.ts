import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PersonAccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        justifyContent: 'space-between'
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
    actionsButtonsView: {
        marginBottom: 75
    },
    mainButtonTouchableOpacity: {
        width: 120,
        marginTop: 25,
        padding: 12,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_BLUE,
        alignSelf: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontWeight: '500'
    },
    secondaryButtonTouchableOpacity: {
        alignSelf: 'center'
    },
    addDetailsButtonView: {
        height: 50,
        width: '100%',
        marginTop: 35
    }
});
