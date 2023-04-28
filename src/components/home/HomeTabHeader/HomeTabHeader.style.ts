import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeTabHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    topView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flex: {
        flex: 1
    },
    usernameText: {
        color: COLORS.WHITE,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    bellIconContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    image: {
        width: 90,
        height: 90,
        marginTop: 10,
        borderRadius: 40,
        backgroundColor: COLORS.GRAY_100
    }
});
