import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlePhotoPreviewStyle = StyleSheet.create({
    container: {
        paddingBottom: 8,
        flexDirection: 'row'
    },
    closeView: {
        zIndex: 1,
        right: -6,
        bottom: -12,
        padding: 2,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'flex-end'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 8
    }
});
