import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HuddlePhotosPreviewsStyle = StyleSheet.create({
    container: {
        paddingBottom: 8,
        flexDirection: 'row'
    },
    imageView: {
        marginLeft: 8
    },
    closeView: {
        zIndex: 1,
        right: -4,
        bottom: -10,
        padding: 4,
        borderRadius: 10,
        backgroundColor: COLORS.MESSAGE_BLUE,
        alignSelf: 'flex-end'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 8
    }
});
