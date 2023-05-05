import { StyleSheet } from 'react-native';
import {
    HEADER_HEIGHT_EXPANDED,
    HEADER_HEIGHT_NARROWED
} from '@components/general/ProfileAnimatedImage/ProfileAnimatedImage.const';

export const ProfileAnimatedImageStyle = StyleSheet.create({
    animatedImage: {
        height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    }
});
