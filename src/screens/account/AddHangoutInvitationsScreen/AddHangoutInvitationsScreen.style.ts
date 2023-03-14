import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddHangoutInvitationsScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    inputView: {
        height: 40,
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
    sendButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: COLORS.MAIN_WHITE,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center'
    },
    sendText: {
        color: COLORS.GRAY_100,
        fontWeight: '500'
    }
});
