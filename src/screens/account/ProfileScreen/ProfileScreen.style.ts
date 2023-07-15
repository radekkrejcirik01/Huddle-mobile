import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingBottom: 20
    },
    listContentContainer: {
        paddingTop: 10,
        paddingHorizontal: 5,
        paddingBottom: 50
    },
    description: {
        marginTop: 80,
        fontSize: 20,
        color: COLORS.WHITE,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descriptionButtonView: {
        marginTop: '40%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center'
    },
    descriptionButtonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});
