import React from 'react';
import { Animated } from 'react-native';
import { usePhotoScrollView } from '@hooks/usePhotoScrollView';
import { ProfilePhotoScreenProps } from '@screens/account/ProfilePhotoScreen/ProfilePhotoScreen.props';
import { ProfileAnimatedImage } from '@components/general/ProfileAnimatedImage/ProfileAnimatedImage';
import { ProfilePhotoScreenStyle } from '@screens/account/ProfilePhotoScreen/ProfilePhotoScreen.style';

export const ProfilePhotoScreen = ({
    route
}: ProfilePhotoScreenProps): JSX.Element => {
    const { name, profilePhoto } = route.params;

    const { scale, onScroll } = usePhotoScrollView();

    return (
        <Animated.ScrollView
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            style={ProfilePhotoScreenStyle.scrollView}
        >
            <ProfileAnimatedImage source={profilePhoto} scale={scale} />
        </Animated.ScrollView>
    );
};
